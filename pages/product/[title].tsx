import { useRouter } from "next/router";
import React from "react";
import TrackVisibility from "react-on-screen";
import { useSelector } from "react-redux";
import { BestSellingProduct, ViewProduct } from "../../components";
import { type RootState } from "../../redux";

const ProductPage = () => {
  const router = useRouter();
  const { title } = router.query;
  const count = useSelector((state: RootState) => state.basic.navigationHeight);

  return (
    <div style={{ marginTop: count + "px" }}>
      <ViewProduct title={title} isVisible={true} />
      <BestSellingProduct isVisible={true} />
    </div>
  );
};

export default ProductPage;
