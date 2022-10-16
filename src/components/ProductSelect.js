import { DropDownSelector } from "./DropDownSelector";
import React, {
  useContext, useDebugValue, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeProductIndex,
  selectLayerProperty
} from '../reducers/layersSlice';

export const ProductSelect = () => {
    const dispatch = useDispatch();
    const productIndex = useSelector(state => selectLayerProperty(state, 'productIndex'));

    const productsList = config.productsList;
  
    const onProductChange = (event) => {
      const index = event.target.value;
      dispatch(changeProductIndex(index));
    };
  
    return (
        <DropDownSelector buttonText={'Product'} labelId={'fcav-product-select-label'} id={'fcav-product-select'}
        value={productIndex} onChange={onProductChange} options={productsList} />
    );
  };
