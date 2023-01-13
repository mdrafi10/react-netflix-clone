import React from "react";
import { Circles } from "react-loader-spinner";

function Loader({ loading, subs }) {
  return (
    <div className="w-full flex justify-center">
      <Circles
        visible={loading}
        height={subs ? "20" : "40"}
        width={subs ? "20" : "40"}
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color={subs ? "#fff" : "#6c7280"}
        backgroundColor="#40414f"
      />
    </div>
  );
}

export default Loader;
