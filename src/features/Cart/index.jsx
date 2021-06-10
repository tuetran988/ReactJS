import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { cartTotalSelector, cartItemsCountSelector } from "./selectors";
import { Typography, Box, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { formatPrice } from "../../utils";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "../../constants";
import Footer from "../../components/Footer";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useDispatch } from "react-redux";
import { removeFromCart, addQuantityCartItem } from "../Cart/cartSlice";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
const TAX_RATE = 0.07;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "0 auto",
  },
  table: {
    minWidth: 200,
    padding: theme.spacing(2, 10),
  },
  image: {
    width: "100px",
    height: "100px",
    "& > img": {
      width: "100%",
      height: "100%",
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
    fontSize: "30px",
    cursor:'pointer'
  },
}));
CartFeature.propTypes = {};

function CartFeature(props) {
  const classes = useStyles();
  const total = useSelector(cartTotalSelector);
  const numberTotal = useSelector(cartItemsCountSelector);
  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log(cartItems);
  const dispatch = useDispatch(); 
  function handleRemoveFromCart(item) {
    const idNeedToRemove = item.id;
    const action = removeFromCart(idNeedToRemove);
    dispatch(action);
  }
  function handleChangeNum(id,newQuantity) {
    const action = addQuantityCartItem({
      id : id,
      quantity: newQuantity,
    });
    dispatch(action);
  }

  return (
    <Box className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Product-Information
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Images</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">SalePrice</TableCell>
              <TableCell align="right">Sum</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell align="right">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell className={classes.image}>
                  <img
                    src={
                      item.product.thumbnail
                        ? `${STATIC_HOST}${item.product.thumbnail?.url}`
                        : `${THUMBNAIL_PLACEHOLDER}`
                    }
                    alt="images"
                  />
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  {formatPrice(item.product.salePrice)}
                </TableCell>
                <TableCell align="right">
                  {formatPrice(item.product.salePrice * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <Box>
                    <ControlPointIcon onClick={()=>handleChangeNum(item.id , item.quantity + 1)}/>
                    <Input type="number" value={item.quantity}></Input>
                    <RemoveCircleOutlineIcon
                      onClick={() => handleChangeNum(item.id, item.quantity > 1 ? item.quantity - 1 : 1)}
                    />
                   </Box>
                </TableCell>
                <TableCell align="right">
                  <DeleteForeverIcon
                    className={classes.icon}
                    onClick={() => handleRemoveFromCart(item)}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>ToTal Item</TableCell>
              <TableCell align="right">
                {numberTotal}
                <Typography component="span">-ITEMS</Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{formatPrice(total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </Box>
  );
}

export default CartFeature;
