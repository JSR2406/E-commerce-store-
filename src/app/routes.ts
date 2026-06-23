import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Account } from './pages/Account';
import { Orders, OrderDetail } from './pages/Orders';
import { Admin } from './pages/Admin';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'product/:id', Component: ProductDetail },
      { path: 'category/:category', Component: Products },
      { path: 'cart', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'account', Component: Account },
      { path: 'orders', Component: Orders },
      { path: 'orders/:id', Component: OrderDetail },
      { path: 'admin', Component: Admin },
      { path: 'wishlist', Component: Home },
      { path: 'deals', Component: Products },
      { path: 'about', Component: Home },
      { path: 'contact', Component: Home },
      { path: '*', Component: Home }
    ]
  }
]);
