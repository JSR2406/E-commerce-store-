import { Link } from 'react-router';
import { ShoppingCart, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] dark:bg-zinc-950 text-white mt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#6366F1]">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <span className="font-black text-xl">ShopHub</span>
            </Link>
            <p className="text-sm text-gray-400">
              Your one-stop destination for all your shopping needs. Quality products at the best prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#4F46E5] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#4F46E5] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#4F46E5] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#4F46E5] transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/electronics" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/fashion" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/sports" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Sports & Fitness
                </Link>
              </li>
              <li>
                <Link to="/category/home" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link to="/category/beauty" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Beauty & Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li>123 Shopping Street</li>
              <li>Mumbai, MH 400001</li>
              <li>India</li>
              <li className="pt-2">
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:support@shophub.com" className="hover:text-white transition-colors">
                  support@shophub.com
                </a>
              </li>
            </ul>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:opacity-90">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 ShopHub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/returns" className="text-sm text-gray-400 hover:text-white transition-colors">
                Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}