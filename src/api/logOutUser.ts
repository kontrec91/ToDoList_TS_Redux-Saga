export function logOutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
}
