import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import http from "../api/http";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";

const pageSize = 9;

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const category = searchParams.get("category") || "";
  const page = Number(searchParams.get("page") || 1);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    http
      .get("/products", {
        params: {
          q: searchParams.get("q") || "",
          category: category || undefined,
          page,
          limit: pageSize,
        },
        signal: controller.signal,
      })
      .then(({ data }) => {
        setProducts(data.items);
        setPageInfo({ page: data.page, pages: data.pages, total: data.total });
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [category, page, searchParams]);

  const handleSearch = (event) => {
    event.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (query) next.set("q", query);
    else next.delete("q");
    next.set("page", "1");
    setSearchParams(next);
  };

  const categories = useMemo(
    () => ["All", "T-Shirts", "Hoodies", "Sweatshirts", "Caps", "Accessories", "Outerwear"],
    []
  );

  const goToPage = (nextPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(nextPage));
    setSearchParams(params);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Catalog"
        title="Browse the collection."
        description="Filter by category, search by name or artist, and open any item for the full product story."
      />

      <form onSubmit={handleSearch} className="flex flex-col gap-3 md:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search product or artist"
          className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sand-50 outline-none placeholder:text-sand-300/40"
        />
        <button className="rounded-full bg-sand-50 px-6 py-3 text-sm font-semibold text-ink-950">
          Search
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((item) => {
          const active = item === "All" ? !category : category === item;
          const params = new URLSearchParams(searchParams);
          if (item === "All") params.delete("category");
          else params.set("category", item);
          params.set("page", "1");

          return (
            <button
              key={item}
              onClick={() => setSearchParams(params)}
              className={[
                "rounded-full px-4 py-2 text-sm transition",
                active ? "bg-sand-50 text-ink-950" : "bg-white/5 text-sand-200 hover:bg-white/10",
              ].join(" ")}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 text-sm text-sand-300/70">
        <p>
          {pageInfo.total} items
          {category ? ` in ${category}` : ""}
        </p>
        <p>
          Page {pageInfo.page} of {pageInfo.pages}
        </p>
      </div>

      {loading ? (
        <div className="mt-8 text-sand-300/70">Loading products...</div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-10 flex items-center justify-center gap-3">
        <button
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-sand-50 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          disabled={page >= pageInfo.pages}
          onClick={() => goToPage(page + 1)}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-sand-50 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

