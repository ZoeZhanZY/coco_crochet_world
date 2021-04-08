import React, { useState } from "react";

const Coupon = ({ handleCouponToCart }) => {
  const [coupon, setCoupon] = useState(null);

  const couponHandler = (e) => {
    setCoupon(e.target.value);
  };

  console.log("coupon", coupon);
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
            onClick={(event) => handleCouponToCart(event, coupon)}
            type="submit"
          >
            Apply Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Coupon;
