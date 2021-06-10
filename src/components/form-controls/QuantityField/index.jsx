import React from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { FormHelperText, Box, makeStyles, Typography } from "@material-ui/core";
import { ErrorMessage } from "@hookform/error-message";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

QuantityField.propTypes = {
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

function QuantityField(props) {
  const { form, label, name } = props;
  const { setValue } = form;
  const classes = useStyles();
  return (
    <FormControl variant="outlined" margin="normal" fullWidth>
      <Typography>Quantity</Typography>
      <Controller
        name={name}
        control={form.control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <Box className={classes.box}>
            <IconButton
              onClick={() => {
                setValue(
                  name,
                  Number.parseInt(value) ? Number.parseInt(value) - 1 : 1
                );
              }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <Box className={classes.field}>
              <OutlinedInput
                id={name}
                type="number"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    ></IconButton>
                  </InputAdornment>
                }
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                error={!!error}
              />
              <FormHelperText>{error?.message}</FormHelperText>
            </Box>
            <IconButton
              onClick={() => {
                setValue(
                  name,
                  Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
                );
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
        )}
      />
    </FormControl>
  );
}

export default QuantityField;
