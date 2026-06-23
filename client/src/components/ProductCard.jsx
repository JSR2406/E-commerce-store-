import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/8 bg-white/4 shadow-glow transition duration-300 hover:-translate-y-1 hover:border-white/16">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-ink-950/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-sand-100">
            {product.category}
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-sand-50">{product.name}</h3>
              <p className="mt-1 text-sm text-sand-300/80">{product.artist}</p>
            </div>
            <p className="text-lg font-semibold text-sand-50">${product.price}</p>
          </div>

          <p className="line-clamp-2 text-sm leading-6 text-sand-200/75">{product.description}</p>
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-sand-300/70">
            <span>{product.stockQuantity} in stock</span>
            <span>Rating {product.rating?.toFixed?.(1) ?? product.rating}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

