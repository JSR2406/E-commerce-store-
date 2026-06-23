import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "../store/cartSlice";

const navLinkClass = ({ isActive }) =>
  [
    "rounded-full px-4 py-2 text-sm transition",
    isActive ? "bg-sand-50 text-ink-950" : "text-sand-200 hover:bg-white/8 hover:text-white",
  ].join(" ");

export default function Layout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + (item.quantity || 0), 0)
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  return (
    <div className="page-shell min-h-screen">
      <div className="content-layer">
        <header className="sticky top-0 z-50 border-b border-white/8 bg-ink-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sand-50 text-sm font-black text-ink-950">
                AA
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.35em] text-sand-200">
                  Apparel Artisan
                </div>
                <div className="text-xs text-sand-300/70">Artist-made apparel</div>
              </div>
            </NavLink>

            <nav className="hidden items-center gap-2 md:flex">
              <NavLink to="/catalog" className={navLinkClass}>
                Catalog
              </NavLink>
              <NavLink to="/orders" className={navLinkClass}>
                Orders
              </NavLink>
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
              <NavLink to="/cart" className={navLinkClass}>
                Cart ({cartCount})
              </NavLink>
              {user ? (
                <NavLink to="/account" className={navLinkClass}>
                  {user.username}
                </NavLink>
              ) : (
                <>
                  <NavLink to="/login" className={navLinkClass}>
                    Sign in
                  </NavLink>
                  <NavLink to="/register" className={navLinkClass}>
                    Create account
                  </NavLink>
                </>
              )}
            </nav>

            <NavLink
              to="/cart"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-sand-100 md:hidden"
            >
              Cart ({cartCount})
            </NavLink>
          </div>
        </header>

        <main>
          <Outlet />
        </main>

        <footer className="border-t border-white/8 px-4 py-10 text-sm text-sand-300/70 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>Apparel Artisan builds a calmer path from discovery to checkout.</p>
            <p>React + Node + MongoDB</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
