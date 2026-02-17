import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Minus, Plus, X, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setAppliedCoupon(couponCode);
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? 500 : 0;
  const shipping = subtotal > 999 ? 0 : 50;
  const tax = Math.round((subtotal - discount) * 0.12);
  const total = subtotal - discount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-32 w-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-gray-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:opacity-90"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">{cartItems.length} items in your cart</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="rounded-xl border bg-card p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-40 rounded-lg object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-semibold text-lg hover:text-[#4F46E5]">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                        <Badge className="bg-[#059669] text-white">In Stock</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-10 w-10"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-16 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-10 w-10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#4F46E5]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ₹{item.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>

                    <Button variant="link" className="text-[#4F46E5] p-0 h-auto">
                      Move to Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon Section */}
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Apply Coupon
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={applyCoupon}
                  className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:opacity-90"
                >
                  Apply
                </Button>
              </div>
              {appliedCoupon && (
                <div className="mt-3 flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">
                    Coupon "{appliedCoupon}" applied
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-green-700 dark:text-green-400"
                  >
                    Remove
                  </Button>
                </div>
              )}
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Available Coupons:</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">SAVE10</p>
                      <p className="text-xs text-muted-foreground">Save ₹500 on your order</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setCouponCode('SAVE10')}>
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <Button variant="outline" asChild className="w-full">
              <Link to="/products">
                Continue Shopping
              </Link>
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6 space-y-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#059669]">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <Badge className="bg-[#059669] text-white">Free</Badge>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (GST)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-3xl font-bold text-[#4F46E5]">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {discount > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    You saved ₹{discount.toLocaleString()}!
                  </p>
                </div>
              )}

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:opacity-90 h-14 text-lg"
                asChild
              >
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Checkout</span>
              </div>

              <div className="flex justify-center gap-2">
                <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=60&h=40&fit=crop" alt="Payment" className="h-6 opacity-60" />
                <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=60&h=40&fit=crop" alt="Payment" className="h-6 opacity-60" />
                <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=60&h=40&fit=crop" alt="Payment" className="h-6 opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}