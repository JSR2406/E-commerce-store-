export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: Array<{
    productId: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
  timeline?: Array<{
    status: string;
    date: string;
    time: string;
  }>;
}

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001234',
    date: '2024-02-10',
    status: 'Delivered',
    items: [
      {
        productId: '1',
        name: 'Premium Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        quantity: 1,
        price: 8999,
        color: 'Black'
      },
      {
        productId: '7',
        name: 'Stainless Steel Water Bottle',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
        quantity: 2,
        price: 1299,
        color: 'Silver'
      }
    ],
    subtotal: 11597,
    shipping: 0,
    tax: 1391,
    discount: 500,
    total: 12488,
    shippingAddress: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    paymentMethod: 'UPI',
    trackingNumber: 'TRK123456789',
    timeline: [
      { status: 'Order Placed', date: '2024-02-10', time: '10:30 AM' },
      { status: 'Confirmed', date: '2024-02-10', time: '11:15 AM' },
      { status: 'Shipped', date: '2024-02-11', time: '09:00 AM' },
      { status: 'Out for Delivery', date: '2024-02-13', time: '08:30 AM' },
      { status: 'Delivered', date: '2024-02-13', time: '02:45 PM' }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-001235',
    date: '2024-02-14',
    status: 'Shipped',
    items: [
      {
        productId: '2',
        name: 'Smart Fitness Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        quantity: 1,
        price: 15999
      }
    ],
    subtotal: 15999,
    shipping: 0,
    tax: 1920,
    discount: 0,
    total: 17919,
    shippingAddress: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK987654321',
    timeline: [
      { status: 'Order Placed', date: '2024-02-14', time: '03:20 PM' },
      { status: 'Confirmed', date: '2024-02-14', time: '04:00 PM' },
      { status: 'Shipped', date: '2024-02-15', time: '10:00 AM' }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-001236',
    date: '2024-02-15',
    status: 'Processing',
    items: [
      {
        productId: '4',
        name: 'Organic Cotton T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
        quantity: 3,
        price: 799,
        size: 'L',
        color: 'White'
      }
    ],
    subtotal: 2397,
    shipping: 0,
    tax: 288,
    discount: 200,
    total: 2485,
    shippingAddress: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    paymentMethod: 'UPI',
    timeline: [
      { status: 'Order Placed', date: '2024-02-15', time: '11:30 AM' },
      { status: 'Confirmed', date: '2024-02-15', time: '12:00 PM' }
    ]
  }
];
