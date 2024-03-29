import Router from "next/router";
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { FetchData } from "../../pages/api";
import { addCartItems, RootState } from "../../redux";
import { ImageUrl } from "../../utils";
import { Button, Qty } from "../index";
import Loader from "./Loader";

const ViewProduct = ({ isVisible, title }, { isVisible: any }) => {
  const [product, setProduct] = useState(null);
  const [qtyCount, setQtyCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [imagesArray, setImageArray] = useState([]);

  // cart redux
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currentCartItem =
    cartItems && product
      ? cartItems.find((item: any) => item.product._id === product._id)
      : null;

  // qty control
  const dispatch = useDispatch();
  const onChangeQty = (count: number) => {
    setQtyCount(count);
    setPrice(Number(product.price * count));
  };
  const addCart = () => {
    dispatch(addCartItems({ product: product, qty: qtyCount, price: price }));
  };

  // buy now
  const buyNow = () => {
    dispatch(addCartItems({ product: product, qty: qtyCount, price: price }));
    Router.push("/checkout");
  };

  // fetch product
  const getData = (data: any) => {
    setProduct(data[0]);
    setPrice(data[0].price);
    setImageArray([]);
    data[0].image?.map((items: any, i: number) => {
      setImageArray((oldArray) => [
        ...oldArray,
        { original: ImageUrl(items).url(), thumbnail: ImageUrl(items).url() },
      ]);
    });
  };

  useEffect(() => {
    // fetch data
    if (title && isVisible) {
      FetchData({
        query: `*[_type == "product" && name == '${title}']{
					_id,
					name,
					image,
					price,
					detail,
          rating,
					qty,
					sold,
					feedback,
					"categories": *[_type == "category" && _id == ^.category._ref][0],
					"qtyBtnType": *[_type == "button" && btnType == "qtyBtn"][0],
					"addCartBtn": *[_type == "button" && btnType == "primaryBtn"][0], 
				}`,
        callBack: getData,
      });
    }
    setQtyCount(1);
  }, [isVisible, title]);

  return (
    <>
      {product && (
        <div className="container grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-10 py-4 sm:py-10 min-h-full">
          <div className="md:col-span-2 xl:col-span-2">
            <ImageGallery
              items={imagesArray}
              showNav={false}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </div>
          <div className="justify-center md:col-span-2 xl:col-span-4 grid xl:grid-cols-2 gap-10">
            <div className="order-2 xl:order-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary text-md">Electric Gadget</p>
                  <h1 className="text-xl text-black">{product?.name}</h1>
                </div>
                <p className="text-primary text-xl">${product?.price}</p>
              </div>
              <div className="flex gap-2 items-center py-2">
                <Rating
                  className="text-sm"
                  initialValue={
                    product?.rating
                      ? Number((Math.round(product?.rating * 2) / 2).toFixed(1))
                      : 0
                  }
                  ratingValue={0}
                  readonly
                  size={28}
                />
                <p>({product?.sold})</p>
              </div>
              <hr className="my-4" />
              <p className="mt-2">{product?.detail}</p>
              <hr className="my-4" />
              <h2 className="text-black mb-2">Qty:</h2>
              <Qty
                className="shadow-sm bg-light"
                onChange={onChangeQty}
                maxQty={product?.qty}
                minQty={1}
                defaultQty={qtyCount}
              />
              <div className="flex gap-2 items-center py-2 mt-2">
                <Button
                  className="!bg-gray-100 !text-gray-700"
                  onClick={addCart}
                >
                  Add to Cart
                </Button>
                <Button onClick={buyNow}>Buy Now</Button>
              </div>
            </div>

            <div className="order-1 xl:order-2 bg-transparent-gray rounded p-4 h-[max-content] mt-2 xl:mt-0">
              <h2 className="text-md text-center mb-2">Calculator</h2>
              <hr className="py-2 mt-4" />
              <div className="flex justify-between mb-2">
                <span>Qty: </span>
                <span>{currentCartItem ? currentCartItem.qty : 0}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Price: </span>{" "}
                <span>{currentCartItem ? currentCartItem.price : 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount: </span> <span>0</span>
              </div>
              <hr className="py-2 mt-4" />
              <div className="flex justify-between">
                <span>Total Price: </span>{" "}
                <span>${currentCartItem ? currentCartItem.price : 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {!product && <Loader />}
    </>
  );
};

export default ViewProduct;
