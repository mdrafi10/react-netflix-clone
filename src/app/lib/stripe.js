import "firebase/functions";
import app, { db } from "../utils/firebase";
import { loadStripe } from "@stripe/stripe-js";

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

export const loadCheckout = async (user, priceId) => {
  const docRef = await db
    .collection("customers")
    .doc(user.uid)
    .collection("checkout_sessions")
    .add({
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
  docRef.onSnapshot(async (snap) => {
    const { error, sessionId } = snap.data();

    if (error) {
      alert(`An error occurred: ${error.message}`);
    }
    if (sessionId) {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      stripe.redirectToCheckout({ sessionId });
    }
  });
};
