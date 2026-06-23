import { Link, useParams } from 'react-router';
import { orders } from '../data/orders';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Package, Truck, MapPin, CreditCard } from 'lucide-react';

export function Orders() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <Badge
                  className={
                    order.status === 'Delivered'
                      ? 'bg-[#059669] text-white'
                      : order.status === 'Shipped'
                      ? 'bg-[#3B82F6] text-white'
                      : order.status === 'Processing'
                      ? 'bg-[#F97316] text-white'
                      : 'bg-gray-500 text-white'
                  }
                >
                  {order.status}
                </Badge>
              </div>

              <div className="flex gap-3">
                {order.items.slice(0, 4).map((item, idx) => (
                  <img
                    key={idx}
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                ))}
                {order.items.length > 4 && (
                  <div className="h-20 w-20 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-bold text-xl">₹{order.total.toLocaleString()}</span>
                <div className="flex gap-2">
                  {order.status === 'Shipped' && (
                    <Button size="sm" variant="outline">
                      Track Order
                    </Button>
                  )}
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/orders/${order.id}`}>View Details</Link>
                  </Button>
                  {order.status === 'Delivered' && (
                    <Button size="sm" className="bg-[#4F46E5]">
                      Reorder
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OrderDetail() {
  const { id } = useParams();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <Link to="/orders">
          <Button>Back to Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{order.orderNumber}</h1>
                  <p className="text-muted-foreground">Placed on {order.date}</p>
                </div>
                <Badge
                  className={`text-lg px-4 py-2 ${
                    order.status === 'Delivered'
                      ? 'bg-[#059669] text-white'
                      : order.status === 'Shipped'
                      ? 'bg-[#3B82F6] text-white'
                      : order.status === 'Processing'
                      ? 'bg-[#F97316] text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {order.status}
                </Badge>
              </div>
            </div>

            {/* Order Timeline */}
            {order.timeline && (
              <div className="rounded-xl border bg-card p-6">
                <h2 className="text-xl font-bold mb-6">Order Timeline</h2>
                <div className="space-y-6">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          index === order.timeline!.length - 1
                            ? 'bg-[#059669]'
                            : 'bg-[#4F46E5]'
                        } text-white`}>
                          <Package className="h-5 w-5" />
                        </div>
                        {index < order.timeline!.length - 1 && (
                          <div className="h-12 w-0.5 bg-gray-300 dark:bg-gray-700 my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <p className="font-semibold">{event.status}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.date} at {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h2 className="text-xl font-bold">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                        {item.size && ` • Size: ${item.size}`}
                        {item.color && ` • Color: ${item.color}`}
                      </p>
                      <p className="font-bold text-lg mt-2">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Shipping Address */}
            <div className="rounded-xl border bg-card p-6 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#4F46E5]" />
                <h3 className="font-semibold">Shipping Address</h3>
              </div>
              <p className="text-sm">
                {order.shippingAddress.name}<br />
                {order.shippingAddress.phone}<br />
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                {order.shippingAddress.pincode}
              </p>
            </div>

            {/* Payment Method */}
            <div className="rounded-xl border bg-card p-6 space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#4F46E5]" />
                <h3 className="font-semibold">Payment Method</h3>
              </div>
              <p className="text-sm">{order.paymentMethod}</p>
            </div>

            {/* Order Summary */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-[#059669]">
                    <span>Discount</span>
                    <span>-₹{order.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹{order.tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#4F46E5]">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Download Invoice
              </Button>
              {order.status === 'Delivered' && (
                <Button className="w-full bg-[#4F46E5]">
                  Write a Review
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}