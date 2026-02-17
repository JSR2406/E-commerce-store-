import { useState } from 'react';
import { Product, products as initialProducts } from '../data/products';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { Upload, Package, Edit, Trash2, ImagePlus, X } from 'lucide-react';
import { toast } from 'sonner';

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    inStock: true,
    stockCount: 0,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          setImagePreview([...imagePreview, ...newImages]);
        };
        reader.readAsDataURL(file);
      });
      toast.success('Images uploaded successfully!');
    }
  };

  const removeImage = (index: number) => {
    setImagePreview(imagePreview.filter((_, i) => i !== index));
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name: formData.name,
      description: formData.description,
      price: formData.price,
      originalPrice: formData.originalPrice,
      discount: formData.originalPrice
        ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
        : 0,
      rating: 0,
      reviews: 0,
      category: formData.category,
      images: imagePreview.length > 0 ? imagePreview : ['https://via.placeholder.com/400'],
      inStock: formData.inStock,
      stockCount: formData.stockCount,
    };

    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success('Product added successfully!');
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id
        ? {
            ...editingProduct,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            originalPrice: formData.originalPrice,
            category: formData.category,
            inStock: formData.inStock,
            stockCount: formData.stockCount,
            images: imagePreview.length > 0 ? imagePreview : editingProduct.images,
            discount: formData.originalPrice
              ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
              : 0,
          }
        : p
    );

    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    resetForm();
    toast.success('Product updated successfully!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success('Product deleted successfully!');
  };

  const handleUpdateStock = (id: string, inStock: boolean, stockCount?: number) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, inStock, stockCount: stockCount ?? p.stockCount } : p
    );
    setProducts(updatedProducts);
    toast.success('Stock updated successfully!');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      category: '',
      inStock: true,
      stockCount: 0,
    });
    setImagePreview([]);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      category: product.category,
      inStock: product.inStock,
      stockCount: product.stockCount || 0,
    });
    setImagePreview(product.images);
    setIsEditDialogOpen(true);
  };

  const ProductForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Product Images</Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-[#4F46E5] transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <ImagePlus className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
          </label>
        </div>

        {/* Image Preview */}
        {imagePreview.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {imagePreview.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter product name"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter product description"
          rows={4}
        />
      </div>

      {/* Price & Original Price */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="originalPrice">Original Price (₹)</Label>
          <Input
            id="originalPrice"
            type="number"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
            placeholder="0"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Fashion">Fashion</SelectItem>
            <SelectItem value="Sports">Sports & Fitness</SelectItem>
            <SelectItem value="Home">Home & Living</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stock Management */}
      <div className="space-y-4 border rounded-lg p-4">
        <h3 className="font-semibold">Stock Management</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stockCount">Stock Count</Label>
            <Input
              id="stockCount"
              type="number"
              value={formData.stockCount}
              onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Select
              value={formData.inStock ? 'in-stock' : 'out-of-stock'}
              onValueChange={(value) =>
                setFormData({ ...formData, inStock: value === 'in-stock' })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button
        className="w-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1]"
        onClick={isEdit ? handleEditProduct : handleAddProduct}
      >
        {isEdit ? 'Update Product' : 'Add Product'}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Product Management</h2>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1]">
              <Package className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <div className="rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Product</th>
                <th className="text-left p-4 font-semibold">Category</th>
                <th className="text-left p-4 font-semibold">Price</th>
                <th className="text-left p-4 font-semibold">Stock</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{product.category}</Badge>
                  </td>
                  <td className="p-4">
                    <p className="font-bold">₹{product.price.toLocaleString()}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <Input
                      type="number"
                      value={product.stockCount || 0}
                      onChange={(e) =>
                        handleUpdateStock(product.id, product.inStock, Number(e.target.value))
                      }
                      className="w-20"
                    />
                  </td>
                  <td className="p-4">
                    <Select
                      value={product.inStock ? 'in-stock' : 'out-of-stock'}
                      onValueChange={(value) =>
                        handleUpdateStock(product.id, value === 'in-stock', product.stockCount)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-stock">
                          <Badge className="bg-[#059669] text-white">In Stock</Badge>
                        </SelectItem>
                        <SelectItem value="out-of-stock">
                          <Badge className="bg-red-500 text-white">Out of Stock</Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm isEdit />
        </DialogContent>
      </Dialog>
    </div>
  );
}
