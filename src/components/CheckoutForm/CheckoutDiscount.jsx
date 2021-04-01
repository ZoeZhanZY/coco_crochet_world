import React from "react";
import { commerce } from "../../lib/commerce";

const DiscountResult = async (checkoutToken, cart) => {
  console.log("discountcode", cart.discount_code);
  console.log("tokenid", checkoutToken.Id);
  const checkoutTokenId = checkoutToken.id;
  const checkoutDiscount = await commerce.checkout.checkDiscount(
    (checkoutTokenId,
    {
      code: cart.discount_code[0],
    })
  );

  return <div>you have a discount code</div>;
};

export default DiscountResult;
