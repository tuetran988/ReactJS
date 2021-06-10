import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CodeIcon from "@material-ui/icons/Code";
import { Link, NavLink, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import Register from "../../features/Auth/components/Register";
import { IconButton, Badge, Box, Menu, MenuItem } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { cartItemsCountSelector } from "../../features/Cart/selectors";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import Login from "../../features/Auth/components/Login";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { logout } from "../../features/Auth/userSlice";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
      color: "#fff",
    },
    miniCart_hidden: {
      display: "none",
    },
    miniCart_visible: {
      width: "300px",
      height: "150px",
      backgroundColor: "white",
      position: "relative",
      top: "87px",
      left: "-13px",
      display: "block",
      borderRadius: "5px",
      zIndex: theme.zIndex.appBar,
      border: "1px solid #ddd4d4",
      padding: "2px",
    },
    item: {
      zIndex: theme.zIndex.modal,
      color: "red",
    },
    itemList: {
      zIndex: theme.zIndex.modal,
    },
    alert: {
      color: theme.palette.grey[500],
    },
    icon: {
      color: theme.palette.success.main,
    },
    inforAlert: {
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "space-around",
      padding: theme.spacing(3, 2),
    },
    closeButton: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
      cursor: "pointer",
      color: theme.palette.grey[500],
      zIndex: "1",
    },
  })
);

export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const MODE = {
    LOGIN: 'login',
    REGISTER :'register',
  }
  const [mode, setMode] = useState(MODE.LOGIN);
  const cartNumber = useSelector(cartItemsCountSelector);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  }
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleCartClick = () => {
    history.push("/cart");
  };

  const handleLogOutClick = () => {
    const action = logout();
    dispatch(action);
  }


  const cartItems = useSelector((state) => state.cart.cartItems);
  const openCart = useSelector((state) => state.cart.showMiniCart);

  const LoggedInUser = useSelector((state) => state.user.current);
  const isLogIn = !!(LoggedInUser.id);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              Mewww
            </Link>
          </Typography>
          <NavLink className={classes.link} to="/todos">
            <Button color="inherit">Todo</Button>
          </NavLink>
          <NavLink className={classes.link} to="/albums">
            <Button color="inherit">AlBum</Button>
          </NavLink>
          <NavLink className={classes.link} to="/products">
            <Button color="inherit">Product</Button>
          </NavLink>

          {!isLogIn && (
            <>
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>
            </>
          )}
          {isLogIn && (
            <Box>
              <IconButton color="inherit" onClick={handleUserClick}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleLogOutClick}>LogOut</MenuItem>
              </Menu>
            </Box>
          )}

          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            onClick={handleCartClick}
          >
            <Badge badgeContent={cartNumber} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Box
            className={
              openCart ? classes.miniCart_visible : classes.miniCart_hidden
            }
          >
            <Box className={classes.inforAlert}>
              <CheckCircleOutlineIcon className={classes.icon} />
              <Typography className={classes.alert}>
                Thêm Vào Giỏ Hàng Thành công
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleCartClick}
            >
              Xem Giỏ Hàng Và Thanh Toán
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <IconButton className={classes.closeButton}>
          <CloseIcon onClick={handleClose} />
        </IconButton>
        <DialogContent>
          {mode === MODE.LOGIN && (
            <>
              <Login closeDiaLog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have acount , register here
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.REGISTER && (
            <>
              <Register closeDiaLog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  have a acount , signin here !
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
