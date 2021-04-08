import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Section, Navbar, Cart, Checkout, ProductPage } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();

    const categories = data.map((category) => category.name);

    setCategories(categories);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
    console.log("cart", cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  // const handleCouponToCart = async (event, coupon) => {
  //   event.preventDefault();

  //   const cartWithCoupon = cart;
  //   cartWithCoupon.discount_code = [coupon];

  //   setCart(cartWithCoupon);
  // };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
      console.log("refreshCart", cart);
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  /* eslint-disable */
  useEffect(async () => {
    await fetchCategories();
    await fetchProducts();
    await fetchCart();
  }, []);
  /* eslint-enable */

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Section
              products={products}
              onAddToCart={handleAddToCart}
              categories={categories}
            />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Route>

          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
          <Route exact path="/product/:id">
            <ProductPage onAddToCart={handleAddToCart} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
