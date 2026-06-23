import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../api/http";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";

const categories = [
  { name: "T-Shirts", note: "Soft tees with distinct graphic language." },
  { name: "Hoodies", note: "Layered shapes and heavier texture." },
  { name: "Accessories", note: "Utility pieces that finish the look." },
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    let active = true;
    http
      .get("/products/featured")
      .then(({ data }) => {
        if (active) setFeatured(data);
      })
      .catch(() => {
        if (active) setFeatured([]);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <section className="border-b border-white/8 bg-hero-grid">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-end pb-4 pt-6 lg:pt-20">
            <p className="text-xs uppercase tracking-[0.45em] text-sand-300/70">Apparel Artisan</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-sand-50 sm:text-6xl lg:text-7xl">
              Artist-made apparel with a slower, sharper point of view.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-sand-200/80 sm:text-lg">
              Browse the capsule collection, add pieces to your cart, and move through checkout without the usual noise.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/catalog"
                className="rounded-full bg-sand-50 px-6 py-3 text-sm font-semibold text-ink-950"
              >
                Explore catalog
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-sand-50"
              >
                Create account
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="soft-panel rounded-[1.5rem] p-4">
                <p className="text-sm text-sand-200/75">Global shipping</p>
                <p className="mt-2 text-lg font-semibold text-sand-50">Worldwide reach</p>
              </div>
              <div className="soft-panel rounded-[1.5rem] p-4">
                <p className="text-sm text-sand-200/75">Secure checkout</p>
                <p className="mt-2 text-lg font-semibold text-sand-50">JWT protected</p>
              </div>
              <div className="soft-panel rounded-[1.5rem] p-4">
                <p className="text-sm text-sand-200/75">Curated drops</p>
                <p className="mt-2 text-lg font-semibold text-sand-50">Small-batch feel</p>
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <div className="grid w-full gap-4">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glow">
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=80"
                  alt="Editorial apparel scene"
                  className="h-[28rem] w-full object-cover"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="soft-panel rounded-[1.5rem] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-sand-300/70">Featured story</p>
                  <p className="mt-3 text-xl font-semibold text-sand-50">A capsule built for better browsing.</p>
                </div>
                <div className="soft-panel rounded-[1.5rem] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-sand-300/70">Tech stack</p>
                  <p className="mt-3 text-xl font-semibold text-sand-50">React, Node, MongoDB, Redux.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Browse"
          title="Three clear entry points."
          description="The collection is organized for quick scanning, with each category designed to move cleanly into product detail."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/catalog?category=${encodeURIComponent(category.name)}`}
              className="soft-panel rounded-[1.75rem] p-6 transition hover:border-white/16 hover:bg-white/6"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-sand-300/70">{category.name}</p>
              <p className="mt-4 text-xl font-semibold text-sand-50">{category.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured"
          title="A few pieces worth pausing on."
          description="These are the featured products surfaced from the backend API."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="soft-panel rounded-[2rem] px-6 py-10 sm:px-10">
          <p className="text-xs uppercase tracking-[0.35em] text-sand-300/70">Next step</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-sand-50 sm:text-4xl">
            Build the cart, secure the session, and ship a storefront that feels like a brand.
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/catalog" className="rounded-full bg-ember-500 px-6 py-3 text-sm font-semibold text-white">
              Start shopping
            </Link>
            <Link to="/orders" className="rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-sand-50">
              View mock orders
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

