import { CheckIcon } from "@heroicons/react/outline";

function Table({ products, selectedPlan }) {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {Object.entries(products).map(([productId, productData]) => {
            return (
              <td
                className={`tableDataFeature ${
                  selectedPlan === productId ? "text-[#E50914]" : "text-[gray]"
                }`}
                key={productId}
              >
                USD{" "}
                {productData?.prices?.priceData?.unit_amount / 100 ||
                  productData.metadata.price}
              </td>
            );
          })}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {Object.entries(products).map(([productId, productData]) => (
            <td
              className={`tableDataFeature ${
                selectedPlan === productId ? "text-[#E50914]" : "text-[gray]"
              }`}
              key={productId}
            >
              {productData.metadata.videoQulity}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {Object.entries(products).map(([productId, productData]) => (
            <td
              className={`tableDataFeature ${
                selectedPlan === productId ? "text-[#E50914]" : "text-[gray]"
              }`}
              key={productId}
            >
              {productData.metadata.resolution}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {Object.entries(products).map(([productId, productData]) => (
            <td
              className={`tableDataFeature ${
                selectedPlan === productId ? "text-[#E50914]" : "text-[gray]"
              }`}
              key={productId}
            >
              {productData.metadata.portability === "true" && (
                <CheckIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
