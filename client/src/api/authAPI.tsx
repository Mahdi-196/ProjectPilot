// client/src/api/authAPI.tsx
import { UserLogin } from "../interfaces/UserLogin";

const API_BASE_URL = "https://projectpilot-15.onrender.com"; // Deployed backend URL

const login = async (userInfo: UserLogin): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export { login };
