import React, { useState } from "react";
import { commerce } from "../../../lib/commerce";
import { Typography, ListItem, ListItemText } from "@material-ui/core";

const Coupon = ({
  checkoutToken,
  setCheckoutToken,
  discountPrice,
  setDiscountPrice,
  isDiscountChecked,
  setIsDiscountChecked,
  isDiscountValid,
  setIsDiscountValid,
}) => {
  const [coupon, setCoupon] = useState(null);

  const couponHandler = (e) => {
    setCoupon(e.target.value);
  };

  const checkDiscountCode = async (event, checkoutTokenId) => {
    event.preventDefault();

    console.log("isDiscountChecked", isDiscountChecked);

    try {
      const discountResult = await commerce.checkout.checkDiscount(
        checkoutTokenId,
        { code: coupon }
      );
      console.log("discountResult", discountResult);
      setIsDiscountChecked(true);
      setIsDiscountValid(discountResult.valid);

      const token = await commerce.checkout.getToken(checkoutTokenId);
      console.log("token", token);

      setDiscountPrice(
        token?.live?.discount?.amount_saved?.formatted_with_symbol
      );

      setCheckoutToken(token);
    } catch (error) {
      console.log("error", error);
    }
  };

  const DiscountDisplay = () => {
    return isDiscountValid ? (
      <ListItem style={{ padding: "10px 0" }}>
        <ListItemText primary="Discount" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          -{discountPrice}
        </Typography>
      </ListItem>
    ) : (
      <div>Coupon code is not valid or expired, please try another one.</div>
    );
  };

  return (
    <div>
      I have a coupon code:
      <form>
        <input
          value={coupon}
          onChange={couponHandler}
          type="text"
          id="discount_code"
        />
        <button
          onClick={(event) => checkDiscountCode(event, checkoutToken.id)}
          type="submit"
        >
          Apply Coupon
        </button>
      </form>
      {isDiscountChecked && <DiscountDisplay />}
    </div>
  );
};

export default Coupon;
