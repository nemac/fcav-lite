import { DropDownSelector } from "./DropDownSelector";
import React, {
  useContext, useDebugValue, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import { useStateWithLabel, getWMSLayersYearRange } from '../utils';

export const ProductSelect = ({
    startDate, endDate, setDateRangeIndex, productIndex, setProductIndex, setWmsLayers
  }) => {
    const productsList = config.productsList;
  
    const onProductChange = (event) => {
      const index = event.target.value;
      setProductIndex(index);
      const newProduct = getWMSLayersYearRange(startDate, endDate, index);
      setWmsLayers(newProduct);
      setDateRangeIndex(0);
    };
  
    return (
        <DropDownSelector buttonText={'Product'} labelId={'fcav-product-select-label'} id={'fcav-product-select'}
        value={productIndex} onChange={onProductChange} options={productsList} />
    );
  };

  ProductSelect.propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    setDateRangeIndex: PropTypes.func.isRequired,
    productIndex: PropTypes.number.isRequired,
    setProductIndex: PropTypes.func.isRequired,
    setWmsLayers: PropTypes.func.isRequired
  };
