import React from "react";
import Auth from "./Auth";
import Netflix from "./Netflix";

function Layouts() {
  const user = {};
  return <div>{user ? <Netflix /> : <Auth />}</div>;
}

export default Layouts;
