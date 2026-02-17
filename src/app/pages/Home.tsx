import { Link } from 'react-router';
import { Truck, Shield, RefreshCw, Headphones, ArrowRight, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/products';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { useEffect, useState } from 'react';

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: 'Summer Sale',
      subtitle: 'Up to 50% off on selected items',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80',
      badge: '50% OFF'
    },
    {
      title: 'New Arrivals',
      subtitle: 'Check out our latest collection',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
      badge: 'New Arrival'
    },
    {
      title: 'Premium Quality',
      subtitle: 'Experience luxury at affordable prices',
      image: 'https://images.unsplash.com/photo-1769509456084-dacd3cde0e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcmVtaXVtJTIwc2hvcHBpbmclMjBwcm9kdWN0c3xlbnwxfHx8fDE3NzEyNTI3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'Premium'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const trustBadges = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over ₹999'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure checkout'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '30 days return policy'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Always here to help'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden bg-gradient-to-r from-[#4F46E5] to-[#6366F1]">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl space-y-6">
                  <Badge className="bg-[#F97316] text-white text-lg px-4 py-2 font-bold">
                    {slide.badge}
                  </Badge>
                  <h1 className="text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-white/90 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <Link to="/products">
                    <Button
                      size="lg"
                      className="bg-white text-[#4F46E5] hover:bg-white/90 text-lg px-8 py-6 rounded-full font-bold"
                    >
                      Shop Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border transition-transform hover:scale-105"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#4F46E5] to-[#6366F1]">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{badge.title}</h3>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Explore our wide range of products</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/5] transition-transform hover:scale-105"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Badge className="mb-2 bg-[#4F46E5] text-white">Editor's Choice</Badge>
              <h2 className="text-4xl font-bold mb-2">Trending Now</h2>
              <p className="text-muted-foreground">Most popular products this week</p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div className="space-y-6 text-white">
                <Badge className="bg-white/20 text-white border-white/30">Limited Time</Badge>
                <h2 className="text-5xl font-black">Up to 70% Off</h2>
                <p className="text-xl text-white/90">
                  Don't miss out on our biggest sale of the season. Limited stock available!
                </p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-black">12</div>
                    <div className="text-sm text-white/80">Hours</div>
                  </div>
                  <div className="text-4xl font-black">:</div>
                  <div className="text-center">
                    <div className="text-4xl font-black">34</div>
                    <div className="text-sm text-white/80">Minutes</div>
                  </div>
                  <div className="text-4xl font-black">:</div>
                  <div className="text-center">
                    <div className="text-4xl font-black">56</div>
                    <div className="text-sm text-white/80">Seconds</div>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="bg-white text-[#4F46E5] hover:bg-white/90 text-lg px-8 py-6 rounded-full font-bold"
                  asChild
                >
                  <Link to="/products">Shop Now</Link>
                </Button>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&q=80"
                  alt="Special Offer"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Badge className="bg-[#4F46E5] text-white">Exclusive Offers</Badge>
            <h2 className="text-4xl font-bold">Join Our Community</h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to our newsletter and get exclusive deals, new arrivals, and special offers delivered to your inbox.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:opacity-90 px-8">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}