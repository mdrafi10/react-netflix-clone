import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { db } from "../utils/firebase";
import { loadStripe } from "@stripe/stripe-js";
import { fetchUser } from "../utils/fetchUser";
import Loader from "./shared/Loader";

function PlansScreen({ title, pixel, onClick, subs }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [productID, setProductID] = useState(null);
  const localUser = fetchUser();
  const user = useSelector(selectUser) || localUser;
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    setLoading(true);
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const pricesSnap = await productDoc.ref.collection("prices").get();
          pricesSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
        setLoading(false);
      });
  }, []);

  const loadCheckOut = async (priceId) => {
    setProductID(priceId);
    setLoading1(true);
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
        const stripe = await loadStripe(
          "pk_test_51MN137IeuJp1aKAfQ55eXrykTGwoRlS4kW9Kd5Cv5FmSAzOIoDDuBRi9q6M23v3AE40G7yu0JcyYzDxGj5PNmioD00kDXwr0Pu"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
    setLoading1(false);
  };

  return (
    <div>
      <h3
        className={`text-lg font-bold border-b text-white py-2 border-gray-800 mt-2 ${
          !subscription && "mb-8"
        }`}
      >
        Plans {loading && <Loader loading={loading} />}
        {subscription && <span>(Current Plan: {subscription?.role})</span>}
      </h3>
      {subscription && (
        <h3 className="text-base font-bold text-white py-2 mb-4 mt-2">
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </h3>
      )}

      {Object.entries(products).map(([productId, productData]) => {
        // TODO: add some logic to check if the user's subscription is active...
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            className="flex items-center justify-between ml-7 mb-10"
            key={productId}
          >
            <div className="text-xs font-bold">
              <h3 className="">{productData.name}</h3>
              <h4 className="text-[10px]">{productData.description}</h4>
            </div>
            <button
              onClick={() =>
                loadCheckOut(!isCurrentPackage && productData.prices.priceId)
              }
              className={`text-white py-[8px] rounded px-5 ${
                isCurrentPackage ? "bg-gray-500" : "bg-[#e50914]"
              } font-semibold border-none`}
              disabled={isCurrentPackage ? true : false}
            >
              {loading1 ? (
                productData.prices.priceId === productID ? (
                  <Loader loading={loading1} subs />
                ) : isCurrentPackage ? (
                  "Current Package"
                ) : (
                  "Subscribe"
                )
              ) : isCurrentPackage ? (
                "Current Package"
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
