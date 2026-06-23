require("dotenv").config();
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const path = require("node:path");

process.env.JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
process.env.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

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

const matchesQuery = (record, query = {}) => {
  if (query.$or) {
    return query.$or.some((part) =>
      Object.entries(part).every(([key, value]) => {
        if (value && value.$regex) {
          return new RegExp(value.$regex, value.$options || "").test(String(record[key] || ""));
        }
        return record[key] === value;
      })
    );
  }

  return Object.entries(query).every(([key, value]) => record[key] === value);
};

const makeArrayQuery = (items, { populateProducts = false } = {}) => {
  let current = [...items];
  return {
    sort(sortValue) {
      if (sortValue === "-createdAt") {
        current.sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0));
      }
      if (sortValue?.updatedAt) {
        current.sort((left, right) =>
          sortValue.updatedAt < 0
            ? new Date(right.updatedAt || 0) - new Date(left.updatedAt || 0)
            : new Date(left.updatedAt || 0) - new Date(right.updatedAt || 0)
        );
      }
      return this;
    },
    skip(count) {
      current = current.slice(count);
      return this;
    },
    limit(count) {
      current = current.slice(0, count);
      return this;
    },
    populate() {
      if (populateProducts) {
        current = current.map((item) => ({
          ...clone(item),
          product: clone(store.products.find((candidate) => candidate._id === item.product)),
        }));
      }
      return this;
    },
    then(resolve, reject) {
      return Promise.resolve(clone(current)).then(resolve, reject);
    },
  };
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
};

const fakeProductModel = {
  async create(payload) {
    return createProductRecord(payload);
  },
  find(query = {}) {
    const filtered = store.products.filter((product) => matchesQuery(product, query));
    return makeArrayQuery(filtered);
  },
  async findById(id) {
    return store.products.find((candidate) => candidate._id === id) || null;
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

const cacheMap = {
  "../models/User": fakeUserModel,
  "../models/Product": fakeProductModel,
  "../models/CartItem": fakeCartItemModel,
  "../models/Order": fakeOrderModel,
};

for (const [relativePath, replacement] of Object.entries(cacheMap)) {
  const absolutePath = path.resolve(__dirname, "models", `${path.basename(relativePath)}.js`);
  require.cache[absolutePath] = {
    id: absolutePath,
    filename: absolutePath,
    loaded: true,
    exports: replacement,
  };
}

resetStore();
createUserRecord({
  username: "artisan-admin",
  email: "admin@apparelartisan.dev",
  password: "Password123!",
  firstName: "Studio",
  lastName: "Admin",
  role: "admin",
});
createUserRecord({
  username: "amber-lee",
  email: "amber@apparelartisan.dev",
  password: "Password123!",
  firstName: "Amber",
  lastName: "Lee",
});
[
  {
    name: "Canvas Halo Tee",
    description: "Heavyweight organic cotton tee with a soft hand-feel.",
    price: 34,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    category: "T-Shirts",
    stockQuantity: 42,
    artist: "Mira Stone",
    isFeatured: true,
  },
  {
    name: "Threadline Hoodie",
    description: "Midweight fleece hoodie with hand-drawn linework inspired by city signage.",
    price: 68,
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    category: "Hoodies",
    stockQuantity: 28,
    artist: "Noah Rives",
    isFeatured: true,
  },
].forEach(createProductRecord);

const app = require("./app");
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Fake dev server running on port ${port}`);
});
