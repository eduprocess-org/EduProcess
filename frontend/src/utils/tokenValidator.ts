interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  
  const payload = decodeToken(token);
  if (!payload) return false;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp > currentTime;
}

export function getTokenExpiration(token: string | null): number | null {
  if (!token) return null;
  
  const payload = decodeToken(token);
  if (!payload) return null;
  
  return payload.exp * 1000;
}
