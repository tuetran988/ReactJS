import React from "react";
import PropTypes from "prop-types";

import { Controller } from "react-hook-form";
import { useState } from "react";
import { makeStyles, TextField, Box, FormHelperText } from "@material-ui/core";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};
const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: "flex",
    flexFlow: "row nowrap",
  },
  field: {},
}));

function InputField(props) {
  const { form, label, name } = props;
  const { setValue,register } = form;
  const classes = useStyles();
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <Box>
          <TextField
            label={label}
            variant="outlined"
            fullWidth
            margin="normal"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
          />
        </Box>
      )}
    />
  );
}

export default InputField;
