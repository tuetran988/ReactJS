import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/form-controls/InputField";
import { Avatar, Typography, makeStyles, Button } from "@material-ui/core";
import LockOutlined from "@material-ui/icons/LockOutlined";
import PasswordField from "../../../../components/form-controls/PasswordField";
import { LinearProgress } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    position:'relative',
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: '0',
    right:'0',
  }
}));

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();
  const { onSubmit } = props;

  const schema = yup.object().shape({
    fullName: yup.string().required("please enter fullName")
      .min(2, 'min 2 characters')
      .test('should has at least two worlds', 'Please enter at least two worlds', (value) => {
        return value.split(' ').length >=2
      }),
    email: yup.string()
              .required('please enter email')
              .email('please enter valid email'),
    password: yup.string()
              .required('please enter password')
              .min(6, 'please enter at least 6 character'),
    retypePassword: yup.string()
                       .required('please enter repassword')
                       .oneOf([yup.ref('password')],'passworld and repassword doesn not match'),
  });

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const { isSubmitting } = form.formState;
  
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Create an Acount
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="fullName" form={form} />
        <InputField name="email" label="email" form={form} />
        <PasswordField name="password" label="password" form={form} />
        <PasswordField
          name="retypePassword"
          label="retypePassword"
          form={form}
        />
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          fullWidth
          className={classes.submit}
          disabled={isSubmitting}
        >
          Create Acount
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
