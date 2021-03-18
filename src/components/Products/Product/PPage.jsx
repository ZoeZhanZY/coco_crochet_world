import React from "react";
import { Container, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

const PPage = () => {
  const { id } = useParams();
  console.log("id", id);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        product {id}
      </Typography>
    </Container>
  );
};

export default PPage;
