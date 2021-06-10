
import React from "react";
import PropTypes from "prop-types";
import { Tabs , Tab} from "@material-ui/core";
    
    ProductSort.propTypes = {
        currentSort: PropTypes.string.isRequired,
        onChange: PropTypes.func,
    };
    ProductSort.defaultProps = {
    
    };
    function ProductSort(props) {
        const { currentSort, onChange } = props;

      const handleSortChange = (event, newValue) => {
            if (onChange) onChange(newValue);
        }   


      return (
        <Tabs
          value={currentSort}
          onChange={handleSortChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Giá Thấp -> Cao" value="salePrice:ASC"></Tab>
          <Tab label="Giá Cao -> Thấp" value="salePrice:DESC"></Tab>
        </Tabs>
      );
    }

    export default ProductSort;