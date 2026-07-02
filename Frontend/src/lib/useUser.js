import { getSession } from "@/lib/auth";

export function useUser() {
  const user = getSession();

  return {
    user,
    regionId: user?.location || null,
    name: user ? `${user.firstName} ${user.lastName}` : null,
  };
}