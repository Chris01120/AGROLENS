import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { login } from "@/lib/auth";

export const Route = createFileRoute("/loginpage")({
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      login(form);
      nav({ to: "/" });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="surface-card w-[420px] p-6 rounded-xl space-y-4"
      >
        {/* LOGO */}
        <div className="text-center">
          <div className="text-2xl font-bold tracking-widest">
            🌾 AGROLENS
          </div>
          <p className="text-xs text-muted-foreground">
            Sign in to your farm intelligence dashboard
          </p>
        </div>

        {/* USERNAME */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Username
          </label>
          <input
            className="w-full p-2 border rounded"
            placeholder="Enter username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
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
              placeholder="Enter password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-ag-cyan"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* OPTIONS ROW */}
        <div className="flex items-center justify-between text-xs">
          
          {/* Remember me */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) =>
                setForm({ ...form, remember: e.target.checked })
              }
            />
            Remember me
          </label>

          {/* Forgot password */}
          <Link
            to="/forgot-password"
            className="text-ag-cyan hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* BUTTON */}
        <button className="w-full bg-gradient-to-r from-ag-cyan to-ag-green text-black py-2 rounded font-semibold">
          <a href="/home">Login</a>
        </button>

        {/* SIGNUP LINK */}
        <p className="text-xs text-center text-muted-foreground">
          Don’t have an account?{" "}
          <Link to="/signuppage" className="text-ag-green hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}