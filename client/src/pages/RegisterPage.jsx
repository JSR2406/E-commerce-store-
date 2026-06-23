import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const submit = async (event) => {
    event.preventDefault();
    const result = await dispatch(registerUser(form));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/catalog");
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100svh-10rem)] max-w-7xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
      <form onSubmit={submit} className="soft-panel w-full max-w-lg rounded-[2rem] p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-sand-300/70">Create account</p>
        <h1 className="mt-3 text-3xl font-semibold text-sand-50">Join the storefront.</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <input
            placeholder="Username"
            value={form.username}
            onChange={(event) => setForm({ ...form, username: event.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
          />
          <input
            placeholder="First name"
            value={form.firstName}
            onChange={(event) => setForm({ ...form, firstName: event.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
          />
          <input
            placeholder="Last name"
            value={form.lastName}
            onChange={(event) => setForm({ ...form, lastName: event.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            className="sm:col-span-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
          />
        </div>
        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        <button
          disabled={status === "loading"}
          className="mt-6 w-full rounded-full bg-ember-500 px-5 py-3 text-sm font-semibold text-white"
        >
          {status === "loading" ? "Creating..." : "Create account"}
        </button>
        <p className="mt-4 text-sm text-sand-300/70">
          Already have an account?{" "}
          <Link to="/login" className="text-sand-50 underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

