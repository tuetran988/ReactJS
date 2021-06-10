import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/form-controls/InputField";
import { Avatar, Typography, makeStyles, Button } from "@material-ui/core";
import LockOutlined from "@material-ui/icons/LockOutlined";
import PasswordField from "../../../../components/form-controls/PasswordField";
import { LinearProgress } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    position: "relative",
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
    position: "absolute",
    top: theme.spacing(1),
    left: "0",
    right: "0",
  },
}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();
  const { onSubmit } = props;

  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required("please enter email")
      .email("please enter valid email"),
    password: yup.string().required("please enter password"),
  });

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
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
        Login
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="email" form={form} />
        <PasswordField name="password" label="password" form={form} />
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          fullWidth
          className={classes.submit}
          disabled={isSubmitting}
        >
          SignIn
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
