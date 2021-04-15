import React from "react";
import Products from "./Products/Products";
import useStyles from "./styles";
import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

const Section = ({ products, onAddToCart, categories }) => {
  /**
   * Retrieve product list associated with a specific category
   * @param {string} category - The category associated with a product
   * @returns {Array} - The filtered product list based on a category
   */

  const classes = useStyles();

  const getProductList = (category) => {
    const filteredProductList = products.filter((product) => {
      const productCategoryList = product.categories.map(
        (categoryItem) => categoryItem.name
      );

      return productCategoryList.includes(category);
    });

    return filteredProductList;
  };

  return categories.map((category) => {
    const productList = getProductList(category);

    return (
      <div key={category}>
        <main className={classes.content}>
          <Grid>
            <CssBaseline />
            <CssBaseline />
            <Typography variant="h5">Category - {category}</Typography>
            <Products products={productList} onAddToCart={onAddToCart} />
          </Grid>
        </main>
      </div>
    );
  });
};
export default Section;
