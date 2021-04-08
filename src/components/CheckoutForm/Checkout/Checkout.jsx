import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";
import { Link, useHistory } from "react-router-dom";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const history = useHistory();

  useEffect(() => {
    // const checkDiscountCode = async (checkoutTokenId) => {
    //   try {
    //     const discountResult = await commerce.checkout.checkDiscount(
    //       checkoutTokenId,
    //       { code: cart.discount_code[0] }
    //     );

    //     setIsDiscountValid(discountResult.valid);

    //     console.log("discountResult", discountResult);

    //     // Apply discount if it's valid
    //     if (discountResult.valid) {
    //       const token = await commerce.checkout.getToken(checkoutTokenId);
    //       setCheckoutToken(token);
    //     }
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // };
    const generateToken = async () => {
      try {
        if (cart && cart.id) {
          const checkoutToken = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          setCheckoutToken(checkoutToken);

          // if (cart.discount_code.length > 0 && checkoutToken) {
          //   checkDiscountCode(checkoutToken.id);
        }
      } catch (error) {
        history.pushState("/");
      }
    };

    generateToken();
  }, [cart, history]);

  // const handleCouponToToken = async (event, coupon) => {
  //   event.preventDefault();

  //   const tokenWithCoupon = token;
  //   tokenWithCoupon.discount_code = [coupon];

  //   setCart(tokenWithCoupon);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    <>
      <Typography variant="h5">Error: {error} </Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} test={test} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        setCheckoutToken={setCheckoutToken}
        shippingData={shippingData}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>

          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
