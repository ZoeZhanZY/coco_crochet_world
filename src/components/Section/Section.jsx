import React from "react";
import Products from "./Products/Products";

const Section = ({ products, onAddToCart, categories }) => {
  /**
   * Retrieve product list associated with a specific category
   * @param {string} category - The category associated with a product
   * @returns {Array} - The filtered product list based on a category
   */
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
        <div>Category - {category}</div>
        <Products products={productList} onAddToCart={onAddToCart} />
      </div>
    );
  });
};
export default Section;
