import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  inStock: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1, size?: string, color?: string) => {
    setCartItems((prevItems) => {
      // Check if item with same id, size, and color already exists
      const existingItemIndex = prevItems.findIndex(
        (item) => {
          // Create a unique key considering id, size, and color
          const itemKey = `${item.id}-${item.size || ''}-${item.color || ''}`;
          const newItemKey = `${product.id}-${size || ''}-${color || ''}`;
          return itemKey === newItemKey;
        }
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: `${product.id}-${size || ''}-${color || ''}`, // Unique ID for cart item
          name: product.name,
          image: product.images[0],
          price: product.price,
          quantity,
          size,
          color,
          inStock: product.inStock
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}