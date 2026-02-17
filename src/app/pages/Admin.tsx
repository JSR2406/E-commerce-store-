import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, ShoppingBag, Users, TrendingUp, Package, AlertTriangle } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { orders } from '../data/orders';
import { ProductManagement } from '../components/ProductManagement';
import { OrderProcessing } from '../components/OrderProcessing';
import { useState } from 'react';

export function Admin() {
  const stats = [
    { label: 'Total Revenue', value: '₹2,45,670', change: '+12.5%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Orders', value: '1,234', change: '+8.2%', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Customers', value: '856', change: '+15.3%', icon: Users, color: 'bg-purple-500' },
    { label: 'Conversion Rate', value: '3.24%', change: '+2.1%', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const salesData = [
    { name: 'Mon', sales: 4000, orders: 24 },
    { name: 'Tue', sales: 3000, orders: 18 },
    { name: 'Wed', sales: 5000, orders: 32 },
    { name: 'Thu', sales: 4500, orders: 28 },
    { name: 'Fri', sales: 6000, orders: 38 },
    { name: 'Sat', sales: 7500, orders: 45 },
    { name: 'Sun', sales: 5500, orders: 35 }
  ];

  const topProducts = [
    { name: 'Premium Wireless Headphones', sales: 234, revenue: '₹21,04,766' },
    { name: 'Smart Fitness Watch', sales: 189, revenue: '₹30,23,811' },
    { name: 'Designer Backpack', sales: 156, revenue: '₹5,45,844' },
    { name: 'Organic Cotton T-Shirt', sales: 432, revenue: '₹3,45,168' },
    { name: 'Running Shoes', sales: 298, revenue: '₹14,89,702' }
  ];

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Order Processing</TabsTrigger>
            <TabsTrigger value="products">Product Management</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-xl border bg-card p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className={`h-12 w-12 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                      </div>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {stat.change}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <div className="rounded-xl border bg-card p-6">
                <h2 className="text-xl font-bold mb-6">Sales Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Orders Chart */}
              <div className="rounded-xl border bg-card p-6">
                <h2 className="text-xl font-bold mb-6">Orders by Day</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top Products */}
              <div className="rounded-xl border bg-card p-6">
                <h2 className="text-xl font-bold mb-6">Top Products</h2>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b last:border-0">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                      <p className="font-bold">{product.revenue}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Alert */}
              <div className="rounded-xl border bg-card p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Low Stock Alert
                </h2>
                <div className="space-y-4">
                  {[
                    { name: 'Premium Wireless Headphones', stock: 5 },
                    { name: 'Designer Backpack', stock: 8 },
                    { name: 'Professional Camera', stock: 3 },
                    { name: 'Yoga Mat Premium', stock: 6 }
                  ].map((product, index) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b last:border-0">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <Badge className="mt-1 bg-orange-500 text-white">
                          {product.stock} left
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        Restock
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="rounded-xl border bg-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Orders</h2>
                <Button variant="outline">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderNumber}</TableCell>
                        <TableCell>{order.shippingAddress.name}</TableCell>
                        <TableCell>{order.items.length}</TableCell>
                        <TableCell className="font-bold">₹{order.total.toLocaleString()}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <OrderProcessing />
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}