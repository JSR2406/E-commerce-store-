import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeCartItem, updateCartItem } from "../store/cartSlice";
import QuantityStepper from "../components/QuantityStepper";
import SectionHeading from "../components/SectionHeading";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import http from "../api/http";

const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.items);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  const subtotal = items.reduce((sum, item) => {
    const price = item.product?.price || item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const checkout = async (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    const { data } = await http.post("/orders", { shippingAddress });
    await dispatch(clearCart());
    navigate("/orders", { state: { orderId: data._id } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Cart"
        title="Review your basket."
        description="Adjust quantities, remove items, and send the current cart into checkout when you're ready."
      />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="soft-panel rounded-[2rem] p-8">
              <p className="text-sand-300/70">Your cart is empty.</p>
              <Link to="/catalog" className="mt-4 inline-block rounded-full bg-sand-50 px-5 py-3 text-sm font-semibold text-ink-950">
                Start browsing
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="soft-panel flex flex-col gap-4 rounded-[2rem] p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={item.product?.imageUrl || item.image}
                  alt={item.product?.name || item.name}
                  className="h-28 w-full rounded-[1.25rem] object-cover sm:w-28"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-sand-50">{item.product?.name || item.name}</h3>
                  <p className="mt-1 text-sm text-sand-300/70">{item.product?.category || "Guest item"}</p>
                  <p className="mt-2 text-sm text-sand-200/80">
                    {formatMoney(item.product?.price || item.price)} each
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(nextQuantity) =>
                      dispatch(updateCartItem({ itemId: item._id, quantity: nextQuantity }))
                    }
                  />
                  <button
                    onClick={() => dispatch(removeCartItem({ itemId: item._id }))}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-sand-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="soft-panel rounded-[2rem] p-6">
          <h3 className="text-xl font-semibold text-sand-50">Summary</h3>
          <div className="mt-4 space-y-3 text-sm text-sand-200/80">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <form onSubmit={checkout} className="mt-6 space-y-3">
            <input
              required
              placeholder="Full name"
              value={shippingAddress.fullName}
              onChange={(event) => setShippingAddress({ ...shippingAddress, fullName: event.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
            />
            <input
              required
              placeholder="Street address"
              value={shippingAddress.street}
              onChange={(event) => setShippingAddress({ ...shippingAddress, street: event.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="City"
                value={shippingAddress.city}
                onChange={(event) => setShippingAddress({ ...shippingAddress, city: event.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
              />
              <input
                required
                placeholder="State"
                value={shippingAddress.state}
                onChange={(event) => setShippingAddress({ ...shippingAddress, state: event.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="Zip code"
                value={shippingAddress.zipCode}
                onChange={(event) => setShippingAddress({ ...shippingAddress, zipCode: event.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
              />
              <input
                required
                placeholder="Country"
                value={shippingAddress.country}
                onChange={(event) => setShippingAddress({ ...shippingAddress, country: event.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
              />
            </div>
            <button className="w-full rounded-full bg-ember-500 px-5 py-3 text-sm font-semibold text-white">
              Place order
            </button>
          </form>

          <button
            onClick={() => dispatch(clearCart())}
            className="mt-3 w-full rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-sand-50"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}

