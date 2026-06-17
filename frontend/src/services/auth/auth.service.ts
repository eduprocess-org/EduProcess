import { mockUsers } from "../../mocks/auth.mock";
import type { LoginRequest } from "../../types/auth/auth.types";

export const login = async (credentials: LoginRequest) => {
  const user = mockUsers.find(
    (u) =>
      u.email === credentials.email &&
      u.password === credentials.password
  );

  if (!user) {
    throw {
      response: {
        status: 401,
      },
    };
  }

  return {
    success: true,
    message: "Login successful",
    data: {
      user,
      tokens: {
        sessionToken: "mock-token",
        refreshToken: "mock-refresh",
      },
    },
  };
};