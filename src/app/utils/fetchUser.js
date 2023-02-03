export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  return userInfo;
};

export const subsLocally = () => {
  const subs =
    localStorage.getItem("subscript") !== undefined
      ? JSON.parse(localStorage.getItem("subscript"))
      : localStorage.clear();
  return subs;
};
