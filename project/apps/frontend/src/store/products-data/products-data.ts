import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@project/shared/core';
import { NameSpace } from '../../common';
import { getAsyncProducts } from '..';

type TProductsData = {
  products: IProduct[];
  isProductsLoading: boolean;
};

const initialState: TProductsData = {
  products: [],
  isProductsLoading: false,
};

const productsData = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAsyncProducts.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(getAsyncProducts.rejected, (state) => {
        state.isProductsLoading = false;
      })
      .addCase(getAsyncProducts.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        state.products = action.payload;
      });
  }
});

export {
  productsData,
  type TProductsData
};
