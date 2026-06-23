import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import http from "../api/http";
import { addToCart } from "../store/cartSlice";
import QuantityStepper from "../components/QuantityStepper";
import SectionHeading from "../components/SectionHeading";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setStatus("loading");
    http
      .get(`/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
        setStatus("succeeded");
      })
      .catch(() => setStatus("failed"));
  }, [id]);

  const handleAdd = async () => {
    if (!product) return;
    await dispatch(addToCart({ product, quantity }));
  };

  if (status === "loading") {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-sand-300/70">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-sand-300/70">Product not found.</p>
        <Link className="mt-4 inline-block text-sand-50 underline" to="/catalog">
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/5">
          <img src={product.imageUrl} alt={product.name} className="h-[32rem] w-full object-cover" />
        </div>

        <div>
          <SectionHeading eyebrow="Product" title={product.name} description={product.description} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="soft-panel rounded-[1.5rem] p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-sand-300/70">Price</p>
              <p className="mt-3 text-3xl font-semibold text-sand-50">${product.price}</p>
            </div>
            <div className="soft-panel rounded-[1.5rem] p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-sand-300/70">Stock</p>
              <p className="mt-3 text-3xl font-semibold text-sand-50">{product.stockQuantity}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm leading-6 text-sand-200/80">
            <p>
              Artist: <span className="text-sand-50">{product.artist}</span>
            </p>
            <p>
              Category: <span className="text-sand-50">{product.category}</span>
            </p>
            <p>
              Sizes: <span className="text-sand-50">{product.sizes?.join(", ")}</span>
            </p>
            <p>
              Colors: <span className="text-sand-50">{product.colors?.join(", ")}</span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <button
              onClick={handleAdd}
              className="rounded-full bg-ember-500 px-6 py-3 text-sm font-semibold text-white"
            >
              Add to cart
            </button>
            <Link to="/cart" className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-sand-50">
              Go to cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

