import { Link } from 'react-router';
import { User, ShoppingBag, Heart, MapPin, CreditCard, Star, Settings, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { orders } from '../data/orders';

export function Account() {
  const stats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Pending', value: '2', icon: ShoppingBag, color: 'bg-orange-500' },
    { label: 'Total Spent', value: '₹45,670', icon: CreditCard, color: 'bg-green-500' },
    { label: 'Wishlist Items', value: '8', icon: Heart, color: 'bg-pink-500' }
  ];

  const navigation = [
    { name: 'Dashboard', icon: User, href: '/account', active: true },
    { name: 'Orders', icon: ShoppingBag, href: '/orders' },
    { name: 'Wishlist', icon: Heart, href: '/wishlist' },
    { name: 'Addresses', icon: MapPin, href: '/account/addresses' },
    { name: 'Payment Methods', icon: CreditCard, href: '/account/payment' },
    { name: 'Reviews', icon: Star, href: '/account/reviews' },
    { name: 'Settings', icon: Settings, href: '/account/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border bg-card p-6 space-y-6">
              {/* Profile Card */}
              <div className="text-center space-y-3">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center text-white text-3xl font-bold mx-auto">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-lg">John Doe</h3>
                  <p className="text-sm text-muted-foreground">john.doe@email.com</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Edit Profile
                </Button>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        item.active
                          ? 'bg-[#4F46E5] text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  );
                })}
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 w-full">
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-xl border bg-card p-6 space-y-2">
                    <div className={`h-12 w-12 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center mb-3`}>
                      <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                    </div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Recent Orders */}
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Recent Orders</h2>
                <Button variant="outline" asChild>
                  <Link to="/orders">View All</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{order.orderNumber}</p>
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

                    <div className="flex gap-2">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img
                          key={idx}
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="h-16 w-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-lg">₹{order.total.toLocaleString()}</span>
                      <div className="flex gap-2">
                        {order.status === 'Shipped' && (
                          <Button size="sm" variant="outline">
                            Track Order
                          </Button>
                        )}
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/orders/${order.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
