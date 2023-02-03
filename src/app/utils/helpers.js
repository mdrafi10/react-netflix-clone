export const setBackgroundImage = (url, style) => ({
  backgroundImage: `url(${url})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  ...style,
});

export function truncate(str, num) {
  return str?.length > num ? str.substr(0, num - 1) + "..." : str;
}
