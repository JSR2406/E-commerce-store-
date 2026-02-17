import { Link } from 'react-router';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../data/products';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.discount || 0;
  const { addToCart } = useCart();
  
  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'Sale':
        return 'bg-[#EF4444] text-white';
      case 'New':
        return 'bg-[#059669] text-white';
      case 'Low Stock':
        return 'bg-[#F97316] text-white';
      case 'Bestseller':
        return 'bg-[#4F46E5] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="group relative rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Badges */}
        {product.badge && (
          <Badge className={`absolute top-3 left-3 ${getBadgeVariant(product.badge)} font-semibold`}>
            {product.badge}
          </Badge>
        )}
        
        {product.discount && product.discount > 0 && (
          <Badge className="absolute top-3 right-3 bg-[#EF4444] text-white font-bold">
            -{product.discount}%
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Quick View Button */}
        <Button
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-white/90 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
        >
          Quick View
        </Button>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem] hover:text-[#4F46E5] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-[#FBBF24] text-[#FBBF24]'
                    : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#4F46E5]">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:opacity-90 transition-opacity"
          onClick={() => {
            addToCart(product);
            toast.success(`${product.name} added to cart!`);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}