// api.js
export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("access");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  // If token expired, try refreshing
  if (response.status === 401) {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      const refreshRes = await fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        localStorage.setItem("access", data.access);

        // Retry original request with new token
        headers["Authorization"] = `Bearer ${data.access}`;
        return fetch(url, { ...options, headers });
      }
    }
  }

  return response;
}
