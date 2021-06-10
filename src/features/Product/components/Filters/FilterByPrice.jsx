import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button, Typography, makeStyles } from "@material-ui/core";
import { useState } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        borderTop:`1px solid ${theme.palette.grey[300]}`,
        padding: theme.spacing(2),
        
    },
    range: {
        display: 'flex',
        flexFlow: ' row nowrap',
        alignItems:'center',
        
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),

        '& > span': {
            marginLeft:theme.spacing(1),   
            marginRight:theme.spacing(2),   
        }
    },
}));




FilterByPrice.propTypes = {
    onChange : PropTypes.func,
};

function FilterByPrice(props) {

    const classes  = useStyles();

    const { onChange } = props;
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte:0,
    })

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
       }))
    }

    const handleSubmit = () => {
        if (onChange) {
            onChange(values);
            setValues({
              salePrice_gte: 0,
              salePrice_lte: 0,
            });
      }
    };

    return (
      <Box className={classes.root}>
        <Typography variant="subtitle2">Gia</Typography>
        <Box className={classes.range}>
          <TextField
            name="salePrice_gte"
            value={values.salePrice_gte}
            onChange={handleChange}
          />
          <span>-</span>
          <TextField
            name="salePrice_lte"
            value={values.salePrice_lte}
            onChange={handleChange}
          />
        </Box>
        <Button variant="outline" color="primary" onClick={handleSubmit} size="small">
          Ap Dung
        </Button>
      </Box>
    );
}

export default FilterByPrice;