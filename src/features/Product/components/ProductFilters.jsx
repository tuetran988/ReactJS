import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from "./Filters/FilterByPrice";
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function ProductFilters(props) {
    const { filters, onChange } = props;
    
    const handleCategoryChange = (newCategoryId) => {
        if (!onChange) return;
       const newFilters = {
           ...filters,
           "category.id" : newCategoryId,
       }
       onChange(newFilters)
  }
  
  const handlePriceChange = (values) => {
    if (!onChange) return;
    onChange(values);
  }
  const handleServiceChange = (values) => {
    if (!onChange) return;
     onChange(values);
  };


    return (
      <Box>
        <FilterByCategory onChange={handleCategoryChange} />
        <FilterByPrice onChange={handlePriceChange} />
        <FilterByService filters={filters} onChange={handleServiceChange}/>
      </Box>
    );
}

export default ProductFilters;