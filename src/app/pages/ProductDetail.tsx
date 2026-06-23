import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { products } from '../data/products';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingCart, Share2, Star, Truck, RefreshCw, Shield, MapPin, Minus, Plus } from 'lucide-react';
import { Input } from '../components/ui/input';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-foreground">Products</Link>
            <span>/</span>
            <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-foreground">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-[#EF4444] text-white text-sm font-bold px-3 py-1">
                  {product.badge}
                </Badge>
              )}
              {product.discount && (
                <Badge className="absolute top-4 right-4 bg-[#EF4444] text-white text-sm font-bold px-3 py-1">
                  -{product.discount}%
                </Badge>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-6 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#4F46E5] scale-105'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#FBBF24] text-[#FBBF24]'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <Link to="#reviews" className="text-sm text-[#4F46E5] hover:underline">
                  ({product.reviews} reviews)
                </Link>
              </div>

              <h1 className="text-3xl font-bold">{product.name}</h1>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>SKU: {product.id.toUpperCase()}-001</span>
                <span>•</span>
                <Badge className="bg-[#059669] text-white">In Stock</Badge>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-[#4F46E5]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="bg-[#EF4444] text-white font-bold">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <label className="font-semibold">Select Color</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative h-12 w-12 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-[#4F46E5] scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white ring-2 ring-[#4F46E5]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {selectedColor && (
                  <p className="text-sm text-muted-foreground">Selected: {selectedColor}</p>
                )}
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-semibold">Select Size</label>
                  <button className="text-sm text-[#4F46E5] hover:underline">Size Chart</button>
                </div>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-14 w-14 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-[#4F46E5] bg-[#4F46E5] text-white'
                          : 'border-gray-300 hover:border-[#4F46E5]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="font-semibold">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {product.stockCount && (
                  <span className="text-sm text-orange-500">Only {product.stockCount} left in stock!</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:opacity-90 text-lg h-14"
                onClick={() => {
                  addToCart(product, quantity, selectedSize, selectedColor);
                  toast.success(`${product.name} added to cart!`);
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button size="lg" variant="outline" className="h-14">
                  Buy Now
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="lg" variant="outline" className="h-14">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Highlights */}
            {product.highlights && (
              <div className="rounded-xl border bg-card p-6 space-y-3">
                <h3 className="font-semibold">Key Features</h3>
                <ul className="space-y-2">
                  {product.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-[#059669] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Delivery Information */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="font-semibold">Delivery & Returns</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <Input placeholder="Enter pincode" className="max-w-xs" />
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <Truck className="h-5 w-5 text-[#059669] flex-shrink-0" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-muted-foreground">Delivers by Tuesday, Feb 18</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <RefreshCw className="h-5 w-5 text-[#059669] flex-shrink-0" />
                  <div>
                    <p className="font-medium">30-Day Returns</p>
                    <p className="text-muted-foreground">Easy return and exchange policy</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <Shield className="h-5 w-5 text-[#059669] flex-shrink-0" />
                  <div>
                    <p className="font-medium">Secure Transaction</p>
                    <p className="text-muted-foreground">100% safe and secure payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="rounded-xl border bg-card p-8 prose dark:prose-invert max-w-none">
                <h3>About this product</h3>
                <p>{product.description}</p>
                <p>
                  This premium product offers exceptional quality and performance. 
                  Designed with attention to detail, it provides everything you need 
                  for an outstanding experience.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="rounded-xl border bg-card p-8">
                {product.specifications ? (
                  <div className="grid gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 py-3 border-b last:border-0">
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Specifications not available</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border bg-card p-8 text-center">
                  <div className="text-5xl font-bold mb-2">{product.rating}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#FBBF24] text-[#FBBF24]'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{product.reviews} reviews</p>
                </div>
                
                <div className="rounded-xl border bg-card p-8 space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm w-8">{rating}★</span>
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FBBF24]"
                          style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12">{rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="rounded-xl border bg-card p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center text-white font-bold">
                          U{review}
                        </div>
                        <div>
                          <p className="font-medium">User {review}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 fill-[#FBBF24] text-[#FBBF24]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="font-medium">Great product!</p>
                    <p className="text-sm text-muted-foreground">
                      Excellent quality and fast delivery. Highly recommended!
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="mt-6">
              <div className="space-y-4">
                {[
                  { q: 'What is the warranty period?', a: 'This product comes with a 1-year manufacturer warranty.' },
                  { q: 'Is installation included?', a: 'No, installation is not included. However, we provide detailed instructions.' },
                  { q: 'Can I return this product?', a: 'Yes, you can return within 30 days of purchase if unused.' }
                ].map((faq, index) => (
                  <div key={index} className="rounded-xl border bg-card p-6">
                    <h4 className="font-semibold mb-2">{faq.q}</h4>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}