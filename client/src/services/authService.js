import api from "./api";

export const signup = async (email, password) => {
  const res = await api.post("/auth/signup", { email, password });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data.user;
};

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data.user;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
