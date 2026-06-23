import { Link } from 'react-router';
import { ShoppingCart, Heart, User, Search, Menu, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useCart } from '../context/CartContext';

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(5);
  const { cartCount } = useCart();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Deals', href: '/deals' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#6366F1]">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <span className="hidden font-black text-xl sm:inline-block bg-gradient-to-r from-[#4F46E5] to-[#6366F1] bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium transition-colors hover:text-[#4F46E5]"
              >
                {link.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-[#4F46E5]">
                Categories
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/category/electronics">Electronics</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/fashion">Fashion</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/sports">Sports & Fitness</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/home">Home & Living</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 rounded-full"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[#4F46E5]">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[#4F46E5]">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/wishlist">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin">Admin</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-10 rounded-full"
                    />
                  </div>
                  <nav className="flex flex-col space-y-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="text-sm font-medium transition-colors hover:text-[#4F46E5] px-2 py-2"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="text-sm font-semibold px-2 py-2">Categories</div>
                    <Link to="/category/electronics" className="text-sm px-4 py-1 hover:text-[#4F46E5]">
                      Electronics
                    </Link>
                    <Link to="/category/fashion" className="text-sm px-4 py-1 hover:text-[#4F46E5]">
                      Fashion
                    </Link>
                    <Link to="/category/sports" className="text-sm px-4 py-1 hover:text-[#4F46E5]">
                      Sports & Fitness
                    </Link>
                    <Link to="/category/home" className="text-sm px-4 py-1 hover:text-[#4F46E5]">
                      Home & Living
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}