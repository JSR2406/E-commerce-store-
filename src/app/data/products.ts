export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  category: string;
  subcategory?: string;
  images: string[];
  badge?: 'Sale' | 'New' | 'Low Stock' | 'Bestseller';
  inStock: boolean;
  stockCount?: number;
  sizes?: string[];
  colors?: Array<{ name: string; hex: string }>;
  highlights?: string[];
  specifications?: Record<string, string>;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience superior sound quality with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.',
    price: 8999,
    originalPrice: 12999,
    discount: 31,
    rating: 4.5,
    reviews: 234,
    category: 'Electronics',
    subcategory: 'Audio',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
    badge: 'Sale',
    inStock: true,
    stockCount: 15,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Blue', hex: '#4F46E5' }
    ],
    highlights: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium sound quality',
      'Comfortable fit for all-day wear'
    ],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Warranty': '1 Year'
    }
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance.',
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    rating: 4.7,
    reviews: 456,
    category: 'Electronics',
    subcategory: 'Wearables',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'],
    badge: 'New',
    inStock: true,
    highlights: [
      'Heart rate monitoring',
      'GPS tracking',
      'Water resistant up to 50m',
      '7-day battery life'
    ]
  },
  {
    id: '3',
    name: 'Designer Backpack',
    description: 'Stylish and functional backpack perfect for work or travel with multiple compartments and laptop sleeve.',
    price: 3499,
    rating: 4.3,
    reviews: 128,
    category: 'Fashion',
    subcategory: 'Bags',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'],
    badge: 'Bestseller',
    inStock: true,
    stockCount: 8,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#1E3A8A' },
      { name: 'Gray', hex: '#6B7280' }
    ]
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable t-shirt made from 100% organic cotton. Perfect for everyday wear.',
    price: 799,
    originalPrice: 1299,
    discount: 38,
    rating: 4.6,
    reviews: 892,
    category: 'Fashion',
    subcategory: 'Clothing',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
    badge: 'Sale',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#6B7280' },
      { name: 'Navy', hex: '#1E3A8A' }
    ]
  },
  {
    id: '5',
    name: 'Professional Camera',
    description: 'Capture stunning photos with this professional-grade camera featuring 24MP sensor and 4K video recording.',
    price: 45999,
    rating: 4.8,
    reviews: 167,
    category: 'Electronics',
    subcategory: 'Cameras',
    images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'],
    badge: 'New',
    inStock: true,
    stockCount: 5
  },
  {
    id: '6',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with superior cushioning and breathable mesh upper for maximum comfort.',
    price: 4999,
    originalPrice: 7999,
    discount: 37,
    rating: 4.4,
    reviews: 523,
    category: 'Sports',
    subcategory: 'Footwear',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
    badge: 'Sale',
    inStock: true,
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '7',
    name: 'Stainless Steel Water Bottle',
    description: 'Keep your drinks cold for 24 hours or hot for 12 hours with this insulated stainless steel bottle.',
    price: 1299,
    rating: 4.7,
    reviews: 1024,
    category: 'Sports',
    subcategory: 'Accessories',
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80'],
    badge: 'Bestseller',
    inStock: true,
    colors: [
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Black', hex: '#000000' },
      { name: 'Blue', hex: '#3B82F6' }
    ]
  },
  {
    id: '8',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with extra cushioning for comfortable practice. Eco-friendly and durable.',
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    rating: 4.5,
    reviews: 312,
    category: 'Sports',
    subcategory: 'Fitness',
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80'],
    badge: 'Sale',
    inStock: true,
    colors: [
      { name: 'Purple', hex: '#9333EA' },
      { name: 'Green', hex: '#10B981' },
      { name: 'Pink', hex: '#EC4899' }
    ]
  },
  {
    id: '9',
    name: 'Mechanical Keyboard RGB',
    description: 'Premium mechanical keyboard with customizable RGB lighting and tactile switches.',
    price: 7999,
    rating: 4.6,
    reviews: 234,
    category: 'Electronics',
    subcategory: 'Accessories',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'],
    badge: 'Bestseller',
    inStock: false,
    stockCount: 0
  },
  {
    id: '10',
    name: 'Leather Wallet',
    description: 'Handcrafted genuine leather wallet with RFID protection and multiple card slots.',
    price: 2499,
    rating: 4.4,
    reviews: 178,
    category: 'Fashion',
    subcategory: 'Accessories',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80'],
    inStock: false,
    stockCount: 0
  }
];

export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    count: 234
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    count: 567
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    count: 189
  },
  {
    id: 'home',
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80',
    count: 423
  },
  {
    id: 'beauty',
    name: 'Beauty & Care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    count: 312
  },
  {
    id: 'books',
    name: 'Books',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80',
    count: 891
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&q=80',
    count: 156
  },
  {
    id: 'food',
    name: 'Food & Grocery',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    count: 678
  }
];