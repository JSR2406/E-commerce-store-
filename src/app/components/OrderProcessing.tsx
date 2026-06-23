import { useState } from 'react';
import { orders as initialOrders, Order } from '../data/orders';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export function OrderProcessing() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    // Update selected order if it's open
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleAddTracking = (orderId: string) => {
    if (!trackingNumber) {
      toast.error('Please enter a tracking number');
      return;
    }
    
    toast.success(`Tracking number ${trackingNumber} added to order ${orderId}`);
    setTrackingNumber('');
  };

  const handleSendNotification = (order: Order) => {
    toast.success(`Email notification sent to ${order.shippingAddress.email}`);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-[#059669] text-white';
      case 'Shipped':
        return 'bg-[#3B82F6] text-white';
      case 'Processing':
        return 'bg-[#F97316] text-white';
      case 'Pending':
        return 'bg-[#EAB308] text-white';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'Shipped':
        return <Truck className="h-4 w-4" />;
      case 'Processing':
        return <Package className="h-4 w-4" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'Pending').length,
    processing: orders.filter((o) => o.status === 'Processing').length,
    shipped: orders.filter((o) => o.status === 'Shipped').length,
    delivered: orders.filter((o) => o.status === 'Delivered').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Order Processing</h2>
        <p className="text-muted-foreground">Manage and process customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-bold">{orderStats.total}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-[#EAB308]">{orderStats.pending}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Processing</p>
          <p className="text-2xl font-bold text-[#F97316]">{orderStats.processing}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Shipped</p>
          <p className="text-2xl font-bold text-[#3B82F6]">{orderStats.shipped}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Delivered</p>
          <p className="text-2xl font-bold text-[#059669]">{orderStats.delivered}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order number, customer name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.shippingAddress.name}</p>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell className="font-bold">₹{order.total.toLocaleString()}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                    >
                      <SelectTrigger className="w-36">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendNotification(order)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <Badge className={`mt-1 ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-xl font-bold">₹{selectedOrder.total.toLocaleString()}</p>
                </div>
              </div>

              {/* Customer Information */}
              <div className="rounded-lg border p-4 space-y-3">
                <h3 className="font-semibold text-lg">Customer Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.shippingAddress.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.pincode}
                      </p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.shippingAddress.country}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{selectedOrder.shippingAddress.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{selectedOrder.shippingAddress.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="rounded-lg border p-4 space-y-3">
                <h3 className="font-semibold text-lg">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold">₹{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₹{selectedOrder.shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>₹{selectedOrder.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Tracking & Actions */}
              <div className="rounded-lg border p-4 space-y-4">
                <h3 className="font-semibold text-lg">Shipping & Tracking</h3>
                
                {/* Add Tracking Number */}
                <div className="space-y-2">
                  <Label>Tracking Number</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter tracking number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                    <Button onClick={() => handleAddTracking(selectedOrder.id)}>
                      Add Tracking
                    </Button>
                  </div>
                </div>

                {/* Delivery Notes */}
                <div className="space-y-2">
                  <Label>Delivery Notes</Label>
                  <Textarea
                    placeholder="Add delivery notes or special instructions..."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1]"
                    onClick={() => handleSendNotification(selectedOrder)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Update Email
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Print Packing Slip
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
