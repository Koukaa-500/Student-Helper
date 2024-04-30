// authService.js

export const setAuthToken = (token, refreshToken) => {
  const tokenExpiry = new Date().getTime() + 600000; // 10 minutes in milliseconds

  localStorage.setItem("authToken", token);
  localStorage.setItem("refreshToken", refreshToken); // Store the refresh token
  localStorage.setItem("tokenExpiry", tokenExpiry.toString());
};

export const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  if (token && tokenExpiry) {
    if (new Date().getTime() > parseInt(tokenExpiry, 10)) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiry");
      return null; // Token expired
    }
    return token; // Valid token
  }
  return null; // No token or expiry time
};

export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenExpiry");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const handleLogout = async () => {
  try {
    const response = await fetch("/accounts/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getAuthToken()}`, // Using TokenAuthentication
      },
      body: JSON.stringify({ refresh: getRefreshToken() }), // Include the refresh token
    });

    if (response.ok) {
      removeAuthToken();
      window.location.href = "/login";
    } else {
      const data = await response.json();
      alert(data.error || "Failed to logout.");
    }
  } catch (error) {
    console.error("Logout error:", error);
    alert("An error occurred while logging out. Please try again.");
  }
};
