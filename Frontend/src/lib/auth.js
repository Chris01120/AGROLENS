// ==========================
// STORAGE KEYS
// ==========================

const USERS_KEY = "agrolens_users";
const CURRENT_USER_KEY = "agrolens_current_user";

// ==========================
// SAFE STORAGE CHECK
// (fixes SSR "sessionStorage is not defined")
// ==========================

const isBrowser = typeof window !== "undefined";

function safeLocalStorage() {
  return isBrowser ? localStorage : null;
}

function safeSessionStorage() {
  return isBrowser ? sessionStorage : null;
}

// ==========================
// GET USERS
// ==========================

function getUsers() {
  const storage = safeLocalStorage();
  if (!storage) return [];

  try {
    return JSON.parse(storage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

// ==========================
// SIGNUP
// ==========================

export function signup(user) {
  const users = getUsers();

  if (!user?.email || !user?.password) {
    throw new Error("Email and password are required");
  }

  // normalize safely
  const newEmail = user.email.toLowerCase();

  const exists = users.find((u) => {
    const uEmail = u?.email?.toLowerCase?.() || "";
    return uEmail === newEmail;
  });

  if (exists) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: Date.now(),

    firstName: user.firstName?.trim() || "",
    lastName: user.lastName?.trim() || "",
    email: user.email.toLowerCase(),
    password: user.password,
    location: user.location || "",

    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  const storage = safeLocalStorage();
  if (storage) {
    storage.setItem(USERS_KEY, JSON.stringify(users));
    storage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  }

  return newUser;
}

// ==========================
// LOGIN
// ==========================

export function login(email, password, rememberMe = false) {
  const users = getUsers();

  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const user = users.find(
    (u) =>
      u?.email?.toLowerCase?.() === email.toLowerCase() &&
      u?.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const storage = safeLocalStorage();
  const session = safeSessionStorage();

  if (rememberMe) {
    storage?.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    session?.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  return user;
}

// ==========================
// LOGOUT
// ==========================

export function logout() {
  const storage = safeLocalStorage();
  const session = safeSessionStorage();

  storage?.removeItem(CURRENT_USER_KEY);
  session?.removeItem(CURRENT_USER_KEY);
}

// ==========================
// CURRENT USER
// ==========================

export function getCurrentUser() {
  const storage = safeLocalStorage();
  const session = safeSessionStorage();

  try {
    const sessionUser = session?.getItem(CURRENT_USER_KEY);
    if (sessionUser) return JSON.parse(sessionUser);

    const localUser = storage?.getItem(CURRENT_USER_KEY);
    if (localUser) return JSON.parse(localUser);

    return null;
  } catch {
    return null;
  }
}

// ==========================
// AUTH CHECK
// ==========================

export function isAuthenticated() {
  return !!getCurrentUser();
}

// ==========================
// RESET PASSWORD
// ==========================

export function resetPassword(email, newPassword) {
  const users = getUsers();

  if (!email || !newPassword) {
    throw new Error("Email and new password required");
  }

  const index = users.findIndex(
    (u) => u?.email?.toLowerCase?.() === email.toLowerCase()
  );

  if (index === -1) {
    throw new Error("Email not found");
  }

  users[index].password = newPassword;

  const storage = safeLocalStorage();
  storage?.setItem(USERS_KEY, JSON.stringify(users));

  return true;
}

// ==========================
// DELETE ACCOUNT
// ==========================

export function deleteAccount() {
  const current = getCurrentUser();
  if (!current) return;

  const users = getUsers();

  const filtered = users.filter((u) => u.id !== current.id);

  const storage = safeLocalStorage();

  storage?.setItem(USERS_KEY, JSON.stringify(filtered));
  logout();
}