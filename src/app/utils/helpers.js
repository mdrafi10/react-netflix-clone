import app from "./firebase";
import "firebase/functions";

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

// stripe cancel billing functionality
export const goToBillingPortal = async () => {
  const functionRef = app
    .functions("us-central1")
    .httpsCallable("ext-firestore-stripe-payments-createPortalLink");
  const { data } = await functionRef({
    returnUrl: `${window.location.origin}/profile`,
  });
  window.location.assign(data.url);
};
