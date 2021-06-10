import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../LoginForm";
import { useDispatch } from "react-redux";
import { login } from "../../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
Login.propTypes = {};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  
  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
       
      const { closeDiaLog } = props;
      if (closeDiaLog) {
        closeDiaLog();
      }
    } catch (error) {
      console.log("error roi");
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
