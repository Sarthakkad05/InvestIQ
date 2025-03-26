export const setToken = (token) => localStorage.setItem("idToken", token);
export const getToken = () => localStorage.getItem("idToken");
export const removeToken = () => localStorage.removeItem("idToken");
