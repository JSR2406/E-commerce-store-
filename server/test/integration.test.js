const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret";
process.env.CLIENT_ORIGIN = "http://localhost:5173";

const store = {
  users: [],
  products: [],
  cartItems: [],
  orders: [],
};

const resetStore = () => {
  store.users = [];
  store.products = [];
  store.cartItems = [];
  store.orders = [];
};

const createId = () => crypto.randomUUID();

const clone = (value) => JSON.parse(JSON.stringify(value));

const regexMatch = (value, regex) => {
  if (!regex) return true;
  return regex.test(String(value || ""));
};

const matchesQuery = (record, query = {}) => {
  if (query.$or) {
    return query.$or.some((part) =>
      Object.entries(part).every(([key, condition]) => {
        if (condition && condition.$regex) {
          return regexMatch(record[key], new RegExp(condition.$regex, condition.$options || ""));
        }

        return record[key] === condition;
      })
    );
  }

  return Object.entries(query).every(([key, value]) => record[key] === value);
};

const makeArrayQuery = (items, { populateProducts = false } = {}) => {
  let current = [...items];

  const api = {
    sort(sortValue) {
      if (sortValue && sortValue.updatedAt) {
        current.sort((left, right) => {
          const leftTime = new Date(left.updatedAt || 0).getTime();
          const rightTime = new Date(right.updatedAt || 0).getTime();
          return sortValue.updatedAt < 0 ? rightTime - leftTime : leftTime - rightTime;
        });
      }

      if (sortValue === "-createdAt") {
        current.sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0));
      }

      return api;
    },
    skip(count) {
      current = current.slice(count);
      return api;
    },
    limit(count) {
      current = current.slice(0, count);
      return api;
    },
    populate() {
      if (populateProducts) {
        current = current.map((item) => {
          const product = store.products.find((candidate) => candidate._id === item.product);
          return {
            ...clone(item),
            product: clone(product),
          };
        });
      }

      return api;
    },
    then(resolve, reject) {
      return Promise.resolve(clone(current)).then(resolve, reject);
    },
    catch(reject) {
      return Promise.resolve(clone(current)).catch(reject);
    },
  };

  return api;
};

const attachUserMethods = (user) => {
  user.matchPassword = async (enteredPassword) => enteredPassword === user.password;
  return user;
};

const createUserRecord = (payload) => {
  const user = attachUserMethods({
    _id: createId(),
    username: payload.username,
    email: payload.email,
    password: payload.password,
    firstName: payload.firstName || "",
    lastName: payload.lastName || "",
    role: payload.role || "customer",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  store.users.push(user);
  return user;
};

const createProductRecord = (payload) => {
  const product = {
    _id: createId(),
    name: payload.name,
    description: payload.description,
    price: payload.price,
    imageUrl: payload.imageUrl,
    category: payload.category,
    stockQuantity: payload.stockQuantity,
    artist: payload.artist || "Apparel Artisan Studio",
    sizes: payload.sizes || ["S", "M", "L", "XL"],
    colors: payload.colors || ["Sand", "Ink", "Clay"],
    rating: payload.rating ?? 4.8,
    numReviews: payload.numReviews ?? 0,
    isFeatured: payload.isFeatured ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    save: async function save() {
      Object.assign(this, { updatedAt: new Date().toISOString() });
      return this;
    },
  };
  store.products.push(product);
  return product;
};

const createCartItemRecord = (payload) => {
  const existing = store.cartItems.find(
    (item) => item.user === payload.user && item.product === payload.product
  );

  if (existing) {
    existing.quantity = payload.quantity;
    existing.updatedAt = new Date().toISOString();
    return existing;
  }

  const cartItem = {
    _id: createId(),
    user: payload.user,
    product: payload.product,
    quantity: payload.quantity,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    save: async function save() {
      this.updatedAt = new Date().toISOString();
      return this;
    },
    populate: async function populate() {
      return {
        ...clone(this),
        product: clone(store.products.find((candidate) => candidate._id === this.product)),
      };
    },
  };

  store.cartItems.push(cartItem);
  return cartItem;
};

const createOrderRecord = (payload) => {
  const order = {
    _id: createId(),
    user: payload.user,
    items: clone(payload.items),
    shippingAddress: clone(payload.shippingAddress),
    subtotal: payload.subtotal,
    status: payload.status || "Processing",
    placedAt: payload.placedAt || new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.orders.push(order);
  return order;
};

const fakeUserModel = {
  async create(payload) {
    if (Array.isArray(payload)) {
      return payload.map((item) => createUserRecord(item));
    }

    return createUserRecord(payload);
  },
  async findOne(query) {
    if (query?.$or) {
      return (
        store.users.find((user) =>
          query.$or.some((part) => Object.entries(part).every(([key, value]) => user[key] === value))
        ) || null
      );
    }

    return store.users.find((user) => Object.entries(query || {}).every(([key, value]) => user[key] === value)) || null;
  },
  findById(id) {
    const user = store.users.find((candidate) => candidate._id === id) || null;
    return {
      async select() {
        return user ? attachUserMethods({ ...clone(user) }) : null;
      },
    };
  },
  async deleteMany() {
    store.users = [];
  },
};

const fakeProductModel = {
  async create(payload) {
    return createProductRecord(payload);
  },
  find(query = {}) {
    const filtered = store.products.filter((product) => matchesQuery(product, query));
    let list = filtered;
    return {
      sort(sortValue) {
        if (sortValue === "-createdAt") {
          list = [...list].sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
        }

        return this;
      },
      skip(count) {
        list = list.slice(count);
        return this;
      },
      limit(count) {
        list = list.slice(0, count);
        return this;
      },
      then(resolve, reject) {
        return Promise.resolve(clone(list)).then(resolve, reject);
      },
    };
  },
  async findById(id) {
    const product = store.products.find((candidate) => candidate._id === id) || null;
    if (!product) return null;

    return {
      ...product,
      save: async function save() {
        Object.assign(product, this);
        product.updatedAt = new Date().toISOString();
        return product;
      },
    };
  },
  async countDocuments(query = {}) {
    return store.products.filter((product) => matchesQuery(product, query)).length;
  },
  async deleteOne(query = {}) {
    const index = store.products.findIndex((product) => matchesQuery(product, query));
    if (index >= 0) {
      store.products.splice(index, 1);
    }
  },
  async deleteMany() {
    store.products = [];
  },
};

const fakeCartItemModel = {
  find(query = {}) {
    const filtered = store.cartItems.filter((item) => matchesQuery(item, query));
    return makeArrayQuery(filtered, { populateProducts: true });
  },
  async findOne(query = {}) {
    return store.cartItems.find((item) => matchesQuery(item, query)) || null;
  },
  async findOneAndUpdate(query = {}, update = {}, options = {}) {
    let item = store.cartItems.find((candidate) => matchesQuery(candidate, query));

    if (!item && options.upsert) {
      item = createCartItemRecord(update);
    } else if (item) {
      Object.assign(item, update, { updatedAt: new Date().toISOString() });
    }

    return item;
  },
  async findOneAndDelete(query = {}) {
    const index = store.cartItems.findIndex((candidate) => matchesQuery(candidate, query));
    if (index === -1) return null;
    const [deleted] = store.cartItems.splice(index, 1);
    return deleted;
  },
  async deleteMany(query = {}) {
    store.cartItems = store.cartItems.filter((item) => !matchesQuery(item, query));
  },
};

const fakeOrderModel = {
  async create(payload) {
    return createOrderRecord(payload);
  },
  find(query = {}) {
    const filtered = store.orders.filter((order) => matchesQuery(order, query));
    return makeArrayQuery(filtered);
  },
  async findOne(query = {}) {
    return store.orders.find((order) => matchesQuery(order, query)) || null;
  },
  async deleteMany() {
    store.orders = [];
  },
};

const modelPaths = {
  "../models/User": fakeUserModel,
  "../models/Product": fakeProductModel,
  "../models/CartItem": fakeCartItemModel,
  "../models/Order": fakeOrderModel,
};

for (const [relativePath, replacement] of Object.entries(modelPaths)) {
  require.cache[require.resolve(relativePath, { paths: [__dirname] })] = {
    id: relativePath,
    filename: relativePath,
    loaded: true,
    exports: replacement,
  };
}

const app = require("../app");

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

test.beforeEach(() => {
  resetStore();
});

test("auth, catalog, cart, and order flow works end to end", async () => {
  const registerResponse = await request(app).post("/api/auth/register").send({
    username: "demo-user",
    email: "demo@apparelartisan.dev",
    password: "Password123!",
    firstName: "Demo",
    lastName: "User",
  });

  assert.equal(registerResponse.statusCode, 201);
  assert.ok(registerResponse.body.token);
  assert.equal(registerResponse.body.username, "demo-user");

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: "demo@apparelartisan.dev",
    password: "Password123!",
  });

  assert.equal(loginResponse.statusCode, 200);
  const authToken = loginResponse.body.token;
  assert.ok(authToken);

  const adminUser = createUserRecord({
    username: "demo-admin",
    email: "admin@apparelartisan.dev",
    password: "Password123!",
    firstName: "Demo",
    lastName: "Admin",
    role: "admin",
  });
  const adminToken = createToken(adminUser._id);

  const createProductResponse = await request(app)
    .post("/api/products")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Canvas Halo Tee",
      description: "Heavyweight tee with a soft hand-feel.",
      price: 34,
      imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
      category: "T-Shirts",
      stockQuantity: 12,
      artist: "Mira Stone",
      isFeatured: true,
    });

  assert.equal(createProductResponse.statusCode, 201);
  assert.equal(createProductResponse.body.name, "Canvas Halo Tee");
  const productId = createProductResponse.body._id;

  const productsResponse = await request(app).get("/api/products");
  assert.equal(productsResponse.statusCode, 200);
  assert.equal(productsResponse.body.total, 1);
  assert.equal(productsResponse.body.items[0]._id, productId);

  const cartResponse = await request(app)
    .post("/api/cart")
    .set("Authorization", `Bearer ${authToken}`)
    .send({ productId, quantity: 2 });

  assert.equal(cartResponse.statusCode, 201);
  assert.equal(cartResponse.body.quantity, 2);

  const cartListResponse = await request(app)
    .get("/api/cart")
    .set("Authorization", `Bearer ${authToken}`);

  assert.equal(cartListResponse.statusCode, 200);
  assert.equal(cartListResponse.body.length, 1);

  const cartItemId = cartListResponse.body[0]._id;

  const updateCartResponse = await request(app)
    .put(`/api/cart/${cartItemId}`)
    .set("Authorization", `Bearer ${authToken}`)
    .send({ quantity: 3 });

  assert.equal(updateCartResponse.statusCode, 200);
  assert.equal(updateCartResponse.body.quantity, 3);

  const orderResponse = await request(app)
    .post("/api/orders")
    .set("Authorization", `Bearer ${authToken}`)
    .send({
      shippingAddress: {
        fullName: "Demo User",
        street: "42 Market Street",
        city: "Bengaluru",
        state: "Karnataka",
        zipCode: "560001",
        country: "India",
      },
    });

  assert.equal(orderResponse.statusCode, 201);
  assert.equal(orderResponse.body.items.length, 1);
  assert.equal(orderResponse.body.subtotal, 102);

  const orderListResponse = await request(app)
    .get("/api/orders")
    .set("Authorization", `Bearer ${authToken}`);

  assert.equal(orderListResponse.statusCode, 200);
  assert.equal(orderListResponse.body.length, 1);

  const rootResponse = await request(app).get("/");
  assert.equal(rootResponse.statusCode, 200);
  assert.equal(rootResponse.body.status, "ok");
});

test("admin guard rejects non-admin users", async () => {
  const user = createUserRecord({
    username: "regular-user",
    email: "user@apparelartisan.dev",
    password: "Password123!",
  });
  const token = createToken(user._id);

  const response = await request(app)
    .post("/api/products")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Denied Item",
      description: "Should not be created.",
      price: 20,
      imageUrl: "https://example.com/image.jpg",
      category: "T-Shirts",
      stockQuantity: 1,
    });

  assert.equal(response.statusCode, 403);
});

