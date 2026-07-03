import { createFileRoute } from '@tanstack/react-router'
import { Navigate } from "@tanstack/react-router";
import { isAuthenticated } from "@/lib/auth";

export const Route = createFileRoute('/ProtectedRoute')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ProtectedRoute"!</div>
}


export function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/loginpage" />;
  }

  return children;
}