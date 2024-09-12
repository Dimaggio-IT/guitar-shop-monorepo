import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../common';
import { IProduct } from '@project/shared/core';
import { getAsyncProduct } from './api-actions';

type TProductData = {
  isProductLoading: boolean;
  product: IProduct | null;
};

const initialState: TProductData = {
  isProductLoading: false,
  product: null,
};

const productData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    assignEmptyProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAsyncProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getAsyncProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.product = action.payload;
      })
      .addCase(getAsyncProduct.rejected, (state) => {
        state.isProductLoading = false;
      });
  }
});

const { assignEmptyProduct } = productData.actions;

export {
  productData,
  assignEmptyProduct,
  type TProductData
};
