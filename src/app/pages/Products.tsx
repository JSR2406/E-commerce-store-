import { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../components/ui/sheet';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router';

export function Products() {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const categories = [
    { id: 'electronics', name: 'Electronics', count: 234 },
    { id: 'fashion', name: 'Fashion', count: 567 },
    { id: 'sports', name: 'Sports & Fitness', count: 189 },
    { id: 'home', name: 'Home & Living', count: 423 }
  ];

  // Count active filters
  const activeFiltersCount = 
    selectedCategories.length + 
    selectedRatings.length +
    (priceRange[0] !== 0 || priceRange[1] !== 50000 ? 1 : 0) +
    (inStockOnly || outOfStockOnly ? 1 : 0);

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategories.length > 0) {
      const categoryMatch = selectedCategories.some(
        cat => product.category.toLowerCase() === cat.toLowerCase()
      );
      if (!categoryMatch) return false;
    }

    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      const hasMatchingRating = selectedRatings.some(rating => product.rating >= rating);
      if (!hasMatchingRating) return false;
    }

    // Availability filter
    if (inStockOnly && !product.inStock) return false;
    if (outOfStockOnly && product.inStock) return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        // Assuming newer products have higher IDs
        return parseInt(b.id) - parseInt(a.id);
      case 'best-selling':
        return b.reviews - a.reviews;
      case 'top-rated':
        return b.rating - a.rating;
      case 'featured':
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, priceRange, selectedRatings, inStockOnly, outOfStockOnly, sortBy]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-lg">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category.id]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category.id));
                  }
                }}
              />
              <label
                htmlFor={category.id}
                className="text-sm cursor-pointer flex-1 flex justify-between"
              >
                <span>{category.name}</span>
                <span className="text-muted-foreground">({category.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-lg">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={50000}
            step={100}
            className="w-full"
          />
          <div className="flex gap-2">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              placeholder="Min"
              className="flex-1"
            />
            <span className="flex items-center">-</span>
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              placeholder="Max"
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-lg">Ratings</h3>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedRatings([...selectedRatings, rating]);
                  } else {
                    setSelectedRatings(selectedRatings.filter(r => r !== rating));
                  }
                }}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm cursor-pointer"
              >
                {rating}★ & up
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-lg">Availability</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={(checked) => {
                setInStockOnly(checked);
                if (checked) setOutOfStockOnly(false);
              }}
            />
            <label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="out-of-stock"
              checked={outOfStockOnly}
              onCheckedChange={(checked) => {
                setOutOfStockOnly(checked);
                if (checked) setInStockOnly(false);
              }}
            />
            <label htmlFor="out-of-stock" className="text-sm cursor-pointer">
              Out of Stock
            </label>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 50000]);
          setSelectedRatings([]);
          setInStockOnly(false);
          setOutOfStockOnly(false);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Products</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="border-b bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} products
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden relative">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-[#4F46E5] text-white text-xs">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="best-selling">Best Selling</SelectItem>
                    <SelectItem value="top-rated">Top Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden md:flex gap-2 border rounded-lg p-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">No products found matching your filters.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange([0, 50000]);
                      setSelectedRatings([]);
                      setInStockOnly(false);
                      setOutOfStockOnly(false);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'default' : 'outline'}
                    className={page === currentPage ? 'bg-[#4F46E5]' : ''}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}