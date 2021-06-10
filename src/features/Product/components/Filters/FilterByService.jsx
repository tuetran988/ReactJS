import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  makeStyles,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2),
  },
    list: {
        padding: 0,
        margin: 0,
        listStyleType:'none',
        '& > li': {
            margin:0,
            marginTop:theme.spacing(1),
        }
 }
}));

FilterByService.propTypes = {
    onChange: PropTypes.func,
    filters:PropTypes.object,
};
FilterByService.defaultProps = {
    onChange: null,
    filters: {},
};

function FilterByService(props) {
  const classes = useStyles();

  const { onChange,filters } = props;
    const handleChange = (e) => {
        if (!onChange) return;
        const { name, checked } = e.target;
         const values = { [name]: checked };
         onChange(values);
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Dich vu</Typography>
      <ul className={classes.list}>
        {[{value:'isPromotion',label:'Khuyến Mãi'},{value:'isFreeShip',label:'miễn phí vận chuyển'}].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}
export default FilterByService;
