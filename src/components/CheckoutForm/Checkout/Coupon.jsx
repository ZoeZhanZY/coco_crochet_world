import React, { useState, useEffect } from "react";
import { commerce } from "../../../lib/commerce";
import { Typography, ListItem, ListItemText } from "@material-ui/core";

const Coupon = ({ checkoutToken, setCheckoutToken }) => {
  const [coupon, setCoupon] = useState(null);
  const [isDiscountValid, setIsDiscountValid] = useState(false);
  const [discountPrice, setDiscountPrice] = useState("");

  useEffect(() => {
    setDiscountPrice(
      checkoutToken?.live?.discount?.amount_saved?.formatted_with_symbol
    );
  }, [checkoutToken]);

  const couponHandler = (e) => {
    setCoupon(e.target.value);
  };

  const checkDiscountCode = async (event, checkoutTokenId) => {
    event.preventDefault();
    try {
      const discountResult = await commerce.checkout.checkDiscount(
        checkoutTokenId,
        { code: coupon }
      );
      console.log("discountResult", discountResult);

      setIsDiscountValid(discountResult.valid);

      // Apply discount if it's valid
      if (discountResult.valid) {
        const token = await commerce.checkout.getToken(checkoutTokenId);
        console.log("token", token);
        setCheckoutToken(token);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
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
      </div>
      <div>
        {isDiscountValid ? (
          <ListItem style={{ padding: "10px 0" }}>
            <ListItemText primary="Discount" />
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              -{discountPrice}
            </Typography>
          </ListItem>
        ) : (
          <div>Coupon code is not valid or expired.</div>
        )}
      </div>
    </div>
  );
};

export default Coupon;
