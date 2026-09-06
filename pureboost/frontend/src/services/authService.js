import api from "./api";

export const authService = {
  async login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  },

  async register(userData) {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("guestCartId");
  },
};
