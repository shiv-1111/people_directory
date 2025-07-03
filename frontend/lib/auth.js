const API_BASE = "http://localhost:5000";

export async function login(email, password) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    console.log(`"details:${res}"`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Login failed");
    return data;
  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
}

export async function logout() {
  try {
    const res = await fetch(`${API_BASE}/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Logout failed");
  } catch (err) {
    console.error("Logout Error:", err);
    throw err;
  }
}

export async function fetchProfile() {
  try {
    const res = await fetch(`${API_BASE}/me`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to fetch profile");
    return data;
  } catch (err) {
    console.error("Profile Error:", err);
    throw err;
  }
}

export async function updateProfile(data) {
  try {
    const res = await fetch(`${API_BASE}/my-detail`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result?.message || "Update failed");
    return result;
  } catch (err) {
    console.error("Update Profile Error:", err);
    throw err;
  }
}

export async function fetchUsers() {
  try {
    const res = await fetch(`${API_BASE}/users`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to fetch users");
    return data;
  } catch (err) {
    console.error("Fetch Users Error:", err);
    throw err;
  }
}

export async function fetchUserById(id) {
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to fetch user");
    return data;
  } catch (err) {
    console.error("Fetch User Error:", err);
    throw err;
  }
}

export async function updateUserById(id, data) {
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result?.message || "Failed to update user");
    return result;
  } catch (err) {
    console.error("Update User Error:", err);
    throw err;
  }
}

export async function deleteUserById(id) {
  try {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result?.message || "Failed to delete user");
    return result;
  } catch (err) {
    console.error("Delete User Error:", err);
    throw err;
  }
}

export async function register(data) {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result?.message || "Registration failed");
    return result;
  } catch (err) {
    console.error("Register Error:", err);
    throw err;
  }
}

export async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE}/me`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await res.json();
    console.log(`Logged in user: ${result}`);
    if (!res.ok) throw new Error(result?.message || "User role not found");
    return result;
  } catch (err) {
    console.error("User role not found", err);
    throw err;
  }
}

export async function registerUser(data) {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(`Registered user: ${result}`);
    if (!res.ok) throw new Error(result?.message || "User registration error!");
    return result;
  } catch (err) {
    console.error("Registration failed!", err);
    throw err;
  }
}
