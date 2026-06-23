export const mockOrders = [
  {
    _id: "ord_1001",
    orderDate: "2025-02-14T10:00:00Z",
    totalAmount: 150.75,
    status: "Delivered",
    items: [
      { productId: "prod_abc", name: "Canvas Halo Tee", quantity: 1, price: 34 },
      { productId: "prod_def", name: "Monolith Overshirt", quantity: 1, price: 116.75 },
    ],
  },
  {
    _id: "ord_1002",
    orderDate: "2025-03-02T14:30:00Z",
    totalAmount: 98,
    status: "Shipped",
    items: [{ productId: "prod_ghi", name: "Gallery Tote", quantity: 2, price: 18 }],
  },
  {
    _id: "ord_1003",
    orderDate: "2025-05-01T09:00:00Z",
    totalAmount: 68,
    status: "Processing",
    items: [{ productId: "prod_jkl", name: "Threadline Hoodie", quantity: 1, price: 68 }],
  },
];

