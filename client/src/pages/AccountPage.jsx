import { useDispatch, useSelector } from "react-redux";
import { logout, updateProfile } from "../store/authSlice";
import { useState } from "react";
import SectionHeading from "../components/SectionHeading";

export default function AccountPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  const save = async (event) => {
    event.preventDefault();
    await dispatch(updateProfile(form));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Account"
        title="Profile and session."
        description="Edit your public profile details and review the current role assigned to this account."
      />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="soft-panel rounded-[2rem] p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-sand-300/70">Signed in as</p>
          <h3 className="mt-3 text-2xl font-semibold text-sand-50">{user?.username}</h3>
          <p className="mt-2 text-sm text-sand-300/70">{user?.email}</p>
          <p className="mt-2 text-sm text-sand-300/70">Role: {user?.role}</p>
          <button
            onClick={() => dispatch(logout())}
            className="mt-6 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-sand-50"
          >
            Sign out
          </button>
        </div>

        <form onSubmit={save} className="soft-panel rounded-[2rem] p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-sand-300/70">Update profile</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              value={form.username}
              onChange={(event) => setForm({ ...form, username: event.target.value })}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
            />
            <input
              value={form.firstName}
              onChange={(event) => setForm({ ...form, firstName: event.target.value })}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
            />
            <input
              value={form.lastName}
              onChange={(event) => setForm({ ...form, lastName: event.target.value })}
              className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand-50 outline-none"
            />
          </div>
          <button className="mt-6 rounded-full bg-sand-50 px-5 py-3 text-sm font-semibold text-ink-950">
            Save profile
          </button>
        </form>
      </div>
    </div>
  );
}

