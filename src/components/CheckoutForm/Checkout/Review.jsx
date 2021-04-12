import React from "react";
import { Typography, ListItem, ListItemText, List } from "@material-ui/core";
import Coupon from "./Coupon";

const Review = ({
  checkoutToken,
  setCheckoutToken,
  discountPrice,
  setDiscountPrice,
  isDiscountChecked,
  setIsDiscountChecked,
  isDiscountValid,
  setIsDiscountValid,
}) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary{" "}
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}

        <Coupon
          checkoutToken={checkoutToken}
          setCheckoutToken={setCheckoutToken}
          discountPrice={discountPrice}
          setDiscountPrice={setDiscountPrice}
          isDiscountChecked={isDiscountChecked}
          setIsDiscountChecked={setIsDiscountChecked}
          isDiscountValid={isDiscountValid}
          setIsDiscountValid={setIsDiscountValid}
        />
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {checkoutToken.live.total_due.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
