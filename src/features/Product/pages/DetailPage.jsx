import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Paper, Grid, makeStyles } from "@material-ui/core";
import ProductThumbnail from "../components/ProductThumbnail";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import useProductDetail from "../hook/useProductDetail";
import Loading from "./Loading";
import ProductInfor from "../components/ProductInfor";
import AddToCartForm from "../components/AddToCartForm";
import ProductMenu from "../components/ProductMenu";
import ProductDescription from "../components/ProductDescription";
import ProductAdditional from "../components/ProductAdditional";
import ProductReview from "../components/ProductReview";
import { useDispatch } from "react-redux";
import { addToCart, showMiniCart, hideMiniCart } from "../../Cart/cartSlice";

DetailPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: "400px",
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: " 1 1 0",
    padding: theme.spacing(1.5),
  },
}));

function DetailPage() {
  const classes = useStyles();
  const match = useRouteMatch();
  const {
    params: { productId },
    url,
  } = match;

  const { loading, product } = useProductDetail(productId);
  const dispatch = useDispatch();

  if (loading) return <Loading />;

  const handleAddToCartSubmit = (formValues) => {
    const action = addToCart({
      id: product.id,
      product: product,
      quantity: formValues.quantity,
    });
    dispatch(action);

    const action2 = showMiniCart();
    dispatch(action2);

    setTimeout(() => {
      const action3 = hideMiniCart();
      dispatch(action3);
    }, 2000);

  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfor product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />
        <Switch>
          <Route path={url} exact>
            <ProductDescription product={product} />
          </Route>
          <Route path={`${url}/additional`} exact>
            <ProductAdditional />
          </Route>
          <Route path={`${url}/reviews`} component={ProductReview} />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
