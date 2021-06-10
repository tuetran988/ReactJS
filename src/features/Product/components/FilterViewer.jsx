import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        
        margin: theme.spacing(2, 0),
        listStyleType: 'none',
        
        '& > li': {
            margin: 0,
            padding: theme.spacing(1),
        }
    }
}))
const FILTER_LIST = [
  {
    id: 1,
    getLabel: (filters) => "Giao Hang Mien Phi",
    isActive: (filters) => filters.isFreeShip, // only active when filters.isFreeShip equals true
    isVisible: () => true, // always show this /so not need check filters
    isRemovable: false, // because it  always show , so it not be remove
    onRemove: (filters) => {}, // do not something because not be remove
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => "co khuyen mai",
    isActive: () => true, // all item always active = true because if it visible then it will active and it can remove so it active
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) =>
      `tu ${filters.salePrice_gte} den ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes("salePrice_lte") &&
      Object.keys(filters).includes("salePrice_gte"),
    isRemovable: true,
      onRemove: (filters) => {
         const newFilters = { ...filters };
         delete newFilters.salePrice_lte;
         delete newFilters.salePrice_gte;
         return newFilters;
    },
    onToggle: () => {},
  },
    {
      id: 4,
      getLabel: () => "Danh Muc",
      isActive: () => true,
      isVisible: (filters) => Object.keys(filters).includes('category.id'),
      isRemovable: true,
      onRemove: (filters) => {
        const newFilters = { ...filters };
        delete newFilters['category.id'];
        return newFilters;
      },
      onToggle: () => {},
    },
];

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();
  
  //visible filters only re execute when filters change
  const visibleFilters = useMemo(() => {
      return FILTER_LIST.filter((x) => x.isVisible(filters))
  },[filters])

    return (
      <Box component="ul" className={classes.root}>
        {visibleFilters.map((x) => (
          <li key={x.id}>
            <Chip
              label={x.getLabel(filters)}
              color={x.isActive(filters) ? "primary" : "default"}
              clickable={!x.isRemovable}
              onClick={
                x.isRemovable
                  ? null
                  : () => {
                      if (!onChange) return;
                      const newFilters = x.onToggle(filters);
                      onChange(newFilters);
                    }
              }
              onDelete={
                x.isRemovable
                  ? () => {
                      if (!onChange) return;
                      const newFilters = x.onRemove(filters);
                      onChange(newFilters);
                    }
                  : null
              }
            />
          </li>
        ))}
      </Box>
    );
}

export default FilterViewer;