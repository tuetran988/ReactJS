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
import { Box, FormHelperText } from "@material-ui/core";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

function PasswordField(props) {
  const { form, label, name, disable } = props;
  const [showPassword, setShowpassWord] = useState(false);
  const handleClickShowPassword = () => {
    setShowpassWord(!showPassword);
  };
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <FormControl
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!error}
        >
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Box>
            <OutlinedInput
              id={name}
              type={showPassword ? "text" : "password"}
              label={label}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              fullWidth
            />
            <FormHelperText>{error?.message}</FormHelperText>
          </Box>
        </FormControl>
      )}
    />
  );
}

export default PasswordField;
