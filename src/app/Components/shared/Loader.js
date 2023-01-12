import React from "react";
import { Circles } from "react-loader-spinner";

function Loader({ loading }) {
  return (
    <div className="w-full flex justify-center">
      <Circles
        visible={loading}
        height="40"
        width="40"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#6c7280"
        backgroundColor="#40414f"
      />
    </div>
  );
}

export default Loader;
