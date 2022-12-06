import { DropDownSelector } from "./DropDownSelector";
import React, {
  useContext, useDebugValue, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeProductIndex,
  selectLayerProperty
} from '../reducers/layersSlice';

export const ProductSelect = ({selector, actionCreator, productsList}) => {
    const dispatch = useDispatch();
    const productIndex = useSelector(selector);
  
    const onProductChange = (event) => {
      const index = event.target.value;
      dispatch(actionCreator(index));
    };
  
    return (
        <DropDownSelector buttonText={'Product'} labelId={'fcav-product-select-label'} id={'fcav-product-select'}
        value={productIndex} onChange={onProductChange} options={productsList} />
    );
  };

ProductSelect.propTypes = {
  selector: PropTypes.func.isRequired,
  actionCreator: PropTypes.func.isRequired,
  productsList: PropTypes.array.isRequired
};
