import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { Check } from 'lucide-react';

export function Checkout() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const orderSummary = {
    subtotal: 25797,
    shipping: 0,
    tax: 3096,
    discount: 500,
    total: 28393
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      {/* Progress Indicator */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto">
            {[
              { num: 1, label: 'Shipping' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Review' }
            ].map((item, index) => (
              <div key={item.num} className="flex items-center flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                      step > item.num
                        ? 'bg-[#059669] text-white'
                        : step === item.num
                        ? 'bg-[#4F46E5] text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}
                  >
                    {step > item.num ? <Check className="h-6 w-6" /> : item.num}
                  </div>
                  <span className={`font-medium ${step >= item.num ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {item.label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`h-1 flex-1 mx-4 rounded-full ${step > item.num ? 'bg-[#059669]' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="rounded-xl border bg-card p-8 space-y-6">
                <h2 className="text-2xl font-bold">Shipping Information</h2>
                
                {/* Saved Addresses */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Saved Addresses</h3>
                  <RadioGroup defaultValue="address1">
                    <div className="border rounded-lg p-4 space-y-2 hover:border-[#4F46E5] transition-colors">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="address1" id="address1" />
                        <Label htmlFor="address1" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Home</span>
                            <Badge className="bg-[#4F46E5] text-white">Default</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            John Doe, +91 98765 43210<br />
                            123 Main Street, Apartment 4B<br />
                            Mumbai, Maharashtra 400001
                          </p>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* New Address Form */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Add New Address</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input id="pincode" placeholder="Enter pincode" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input id="address" placeholder="House No, Building Name" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="landmark">Landmark</Label>
                      <Input id="landmark" placeholder="Near landmark" />
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:opacity-90"
                  onClick={() => setStep(2)}
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="rounded-xl border bg-card p-8 space-y-6">
                <h2 className="text-2xl font-bold">Payment Method</h2>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {/* UPI */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer font-medium">
                        UPI <Badge className="ml-2 bg-[#059669] text-white">Recommended</Badge>
                      </Label>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div className="ml-6 space-y-3">
                        <Input placeholder="Enter UPI ID (e.g., name@upi)" />
                        <div className="flex gap-3">
                          <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=60&h=40&fit=crop" alt="GPay" className="h-8" />
                          <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=60&h=40&fit=crop" alt="PhonePe" className="h-8" />
                          <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=60&h=40&fit=crop" alt="Paytm" className="h-8" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cards */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer font-medium">
                        Credit / Debit Card
                      </Label>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="ml-6 space-y-3">
                        <div className="space-y-2">
                          <Label>Card Number</Label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Expiry Date</Label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label>CVV</Label>
                            <Input placeholder="123" type="password" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="save-card" />
                          <Label htmlFor="save-card" className="text-sm cursor-pointer">
                            Save card for future purchases
                          </Label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer font-medium">
                        Cash on Delivery
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:opacity-90"
                    onClick={() => setStep(3)}
                  >
                    Continue to Review
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="rounded-xl border bg-card p-8 space-y-4">
                  <h2 className="text-2xl font-bold">Review Order</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Shipping Address</h3>
                        <Button variant="link" className="text-[#4F46E5]" onClick={() => setStep(1)}>
                          Change
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        John Doe, +91 98765 43210<br />
                        123 Main Street, Apartment 4B<br />
                        Mumbai, Maharashtra 400001
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Payment Method</h3>
                        <Button variant="link" className="text-[#4F46E5]" onClick={() => setStep(2)}>
                          Change
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {paymentMethod === 'upi' && 'UPI Payment'}
                        {paymentMethod === 'card' && 'Credit / Debit Card'}
                        {paymentMethod === 'cod' && 'Cash on Delivery'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-card p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      I agree to the Terms and Conditions and Privacy Policy
                    </Label>
                  </div>
                  
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:opacity-90 h-16 text-lg"
                  >
                    Place Order - ₹{orderSummary.total.toLocaleString()}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6 space-y-6">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{orderSummary.subtotal.toLocaleString()}</span>
                </div>
                {orderSummary.discount > 0 && (
                  <div className="flex justify-between text-sm text-[#059669]">
                    <span>Discount</span>
                    <span>-₹{orderSummary.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {orderSummary.shipping === 0 ? (
                      <Badge className="bg-[#059669] text-white">Free</Badge>
                    ) : (
                      `₹${orderSummary.shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (GST)</span>
                  <span>₹{orderSummary.tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-[#4F46E5]">
                      ₹{orderSummary.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
