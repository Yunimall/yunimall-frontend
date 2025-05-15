import { jwtDecode } from "jwt-decode";

// 🔐 Validate token expiry
export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// 🛡️ Role checker
export const hasRequiredRole = (
  token: string | null,
  allowedRoles: string[]
): boolean => {
  if (!token) return false;

  try {
    const decoded: { role?: string } = jwtDecode(token);
    return allowedRoles.includes(decoded.role || "");
  } catch (error) {
    return false;
  }
};
