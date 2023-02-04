import { useEffect, useState } from "react";
import { db } from "../utils/firebase";

function useSubscription(user) {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (!user) return;

    db.collection("customers")
      .doc(user?.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          //   console.log("inner-subscription", subscription.data());
          const subsData = {
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            cancel_at_period_end: subscription.data().cancel_at_period_end,
            current_period_start:
              subscription.data().current_period_start.seconds,
          };
          setSubscription(subsData);
          localStorage.setItem("subscript", JSON.stringify(subsData));
        });
      });
  }, [user?.uid, user]);

  return subscription;
}

export default useSubscription;
