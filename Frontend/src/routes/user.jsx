
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/agrolens/AppShell";
import { getCurrentUser, logout, deleteAccount } from "@/lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/user")({
  component: UserPage,
  head: () => ({
    meta: [
      { title: "User Profile — AGROLENS" },
    ],
  }),
});

function UserPage() {
  const nav = useNavigate();
  const [user, setUser] = useState(getCurrentUser());

  function handleLogout() {
    logout();
    nav({ to: "/login" });
  }

  function handleDelete() {
    const ok = confirm("This will permanently delete your account. Continue?");
    if (!ok) return;

    deleteAccount();
    nav({ to: "/signup" });
  }

  if (!user) {
    return (
      <AppShell>
        <div className="p-10 text-center">
          <h1 className="text-xl font-bold">Not logged in</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Please login to view your profile
          </p>

          <button
            onClick={() => nav({ to: "/login" })}
            className="mt-5 rounded-lg bg-ag-green px-5 py-2 text-black"
          >
            Go to Login
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

        {/* HEADER */}
        <div className="surface-elevated p-6 rounded-xl">
          <h1 className="text-2xl font-bold">
            👤 User Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your AGROLENS account
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="surface-card p-6 rounded-xl space-y-4">

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <label className="text-xs text-muted-foreground">
                First Name
              </label>
              <p className="font-semibold">{user.firstName}</p>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">
                Last Name
              </label>
              <p className="font-semibold">{user.lastName}</p>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">
                Username
              </label>
              <p className="font-semibold">{user.username}</p>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">
                Email
              </label>
              <p className="font-semibold">{user.email}</p>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground">
                Location
              </label>
              <p className="font-semibold">{user.location || "Not set"}</p>
            </div>

          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row gap-3">

          <button
            onClick={handleLogout}
            className="flex-1 rounded-lg bg-ag-amber px-4 py-3 font-semibold cursor-pointer"
          >
            Logout
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 rounded-lg bg-red-500 px-4 py-3 font-semibold text-white cursor-pointer"
          >
            Delete Account
          </button>

        </div>

      </div>
    </AppShell>
  );
}