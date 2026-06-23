import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (event) => {
    event.preventDefault();
    const result = await dispatch(loginUser(form));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/catalog");
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100svh-10rem)] max-w-7xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
      <form onSubmit={submit} className="soft-panel w-full max-w-md rounded-[2rem] p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-sand-300/70">Sign in</p>
        <h1 className="mt-3 text-3xl font-semibold text-sand-50">Welcome back.</h1>
        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
          />
        </div>
        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        <button
          disabled={status === "loading"}
          className="mt-6 w-full rounded-full bg-sand-50 px-5 py-3 text-sm font-semibold text-ink-950"
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>
        <p className="mt-4 text-sm text-sand-300/70">
          New here?{" "}
          <Link to="/register" className="text-sand-50 underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

