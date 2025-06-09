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
    const decoded: { role?: string[] } = jwtDecode(token);

    if (!Array.isArray(decoded.role)) return false;

    // Normalize both sides and check for any match
    const userRoles = decoded.role.map(r => r.toLowerCase().trim());
    const allowed = allowedRoles.map(r => r.toLowerCase().trim());

    const hasRole = userRoles.some(role => allowed.includes(role));

    // console.log("User roles:", userRoles);
    // console.log("Allowed roles:", allowed);
    // console.log("Access granted:", hasRole);

    return hasRole;
  } catch (error) {
    console.error("JWT decode error:", error);
    return false;
  }
};
