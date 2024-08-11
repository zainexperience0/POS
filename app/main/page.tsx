"use client";

import { useEffect } from "react";

const MainPage = () => {
  useEffect(() => {
    window.location.href = "/main/product";
  });
  return <div>MainPage</div>;
};

export default MainPage;
