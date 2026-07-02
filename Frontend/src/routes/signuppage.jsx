import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { signup } from "@/lib/auth";
import { useDerivedAgroLens } from "@/lib/agrolens-store";

export const Route = createFileRoute("/signuppage")({
  component: SignupPage,
});

function SignupPage() {
  const nav = useNavigate();
  const { regions } = useDerivedAgroLens();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // location: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (!form.firstName.trim()) return "First name is required";
    if (!form.lastName.trim()) return "Last name is required";

    if (!form.email.includes("@")) return "Invalid email address";

    if (form.password.length < 6)
      return "Password must be at least 6 characters";

    // if (!form.location) return "Please select a location";

    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const err = validate();
    if (err) return setError(err);

    try {
      signup(form);
      nav({ to: "/loginpage" });
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">

      <form
        onSubmit={handleSubmit}
        className="surface-card w-[420px] p-6 rounded-xl space-y-4"
      >

        {/* LOGO */}
        <div className="text-center mb-2">
          <div className="text-2xl font-bold tracking-widest">
            🌾 AGROLENS
          </div>
          <p className="text-xs text-muted-foreground">
            Create your farm intelligence account
          </p>
        </div>

        {/* FIRST + LAST NAME */}

          <div>
            <label className="text-xs font-semibold text-muted-foreground">
              First Name
            </label>
            <input
              className="w-full p-2 border rounded"
              placeholder="First name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground">
              Last Name
            </label>
            <input
              className="w-full p-2 border rounded"
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>


        {/* EMAIL */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Email
          </label>
          <input
            className="w-full p-2 border rounded"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border rounded"
              placeholder="Create password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-ag-cyan cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* LOCATION DROPDOWN */}
        {/* <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Location
          </label>

          <select
            className="w-full p-2 border rounded"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          >
            <option value="">Select your region</option>

            {regions?.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} — {r.country}
              </option>
            ))}
          </select>
        </div> */}

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-ag-green to-ag-cyan text-black py-2 rounded font-semibold"
        >
          Create Account
        </button>

        {/* LOGIN LINK */}
        <p className="text-xs text-center text-muted-foreground">
          Already have an account?{" "}
          <a href="/loginpage" className="text-ag-cyan hover:underline">
            Login
          </a>
        </p>

      </form>
    </div>
  );
}