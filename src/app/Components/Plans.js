import { CheckIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Table from "./Table";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import LoaderMe from "./shared/LoaderMe";
import { loadCheckout } from "../lib/stripe";
import { useDispatch } from "react-redux";
import { updateSubs } from "../redux/slices/authSlice";

function Plans({ user }) {
  const [products, setProducts] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("prod_N7GXyoBXZpt6AS");
  const [selectedPlanId, setSelectedPlanId] = useState(
    "price_1MN20hIeuJp1aKAf65zghY0n"
  );
  const [isBillingLoading, setBillingLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // subscribe button
  const subscribeToPlan = async () => {
    if (!user) return;

    setBillingLoading(true);
    loadCheckout(user, selectedPlanId);
  };

  // get 3 products of netflix plan
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

  return (
    <div className="text-white">
      <header className="border-b border-white/10 bg-[#141414] flex justify-between px-6">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="Netflix"
            width={150}
            height={90}
            className="cursor-pointer object-contain py-2"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline"
          onClick={() => {
            auth.signOut();
            dispatch(updateSubs(null));
          }}
        >
          Sign Out
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
            your plan anytime.
          </li>
        </ul>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-end self-end md:w-3/5">
            {loading && <LoaderMe loading={loading} />}
            {Object.entries(products).map(([productId, productData]) => (
              <div
                className={`planBox ${
                  selectedPlan === productId ? "opacity-100" : "opacity-60"
                }`}
                key={productId}
                onClick={() => {
                  setSelectedPlan(productId);
                  setSelectedPlanId(productData.prices.priceId);
                }}
              >
                {productData.name}
              </div>
            ))}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />

          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Plans;
