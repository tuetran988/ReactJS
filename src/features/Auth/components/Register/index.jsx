import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "../RegisterForm";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import { unwrapResult } from '@reduxjs/toolkit'
import { useSnackbar } from "notistack";
Register.propTypes = {};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {  
    try {
          // auto set username == email because rules of backend
            values.username = values.email;
      
            const action = register(values);
            const resultAction = await dispatch(action);
        
            const user = unwrapResult(resultAction); // Dùng để lấy kết quả trả về của action bên kia sau khi dispatch nó chính là user.data
          // do something after dispatch successfull
          enqueueSnackbar('register succcesssfully ', { variant: 'success' });
        const { closeDiaLog } = props;
        if (closeDiaLog) {
          closeDiaLog();
        }
       } catch (error) {
         console.log('error')
       }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
