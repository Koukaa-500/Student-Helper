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
  const refreshToken = localStorage.getItem("refreshToken");

  if (token && tokenExpiry) {
    if (new Date().getTime() > parseInt(tokenExpiry, 10)) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiry");
      return null; // Token expired
    }
    return token; // Valid token
  }
  return refreshToken; // No token or expiry time
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



// authService.js

export const getUserId = () => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    // Decode the JWT token to extract user information
    const tokenParts = authToken.split(".");
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload.user_id; // Assuming 'user_id' is the key for user ID in the token payload
    }
  }
  return null; // Return null if token or user ID is not available
};


// Function to parse the JWT token payload
const parseAuthToken = (token) => {
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    
    return null;
  }
};


