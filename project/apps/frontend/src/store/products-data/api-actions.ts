import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '@project/shared/core';
import { TThunkApiConfig } from '../../common';
import { APIRoute, NameSpace } from '../../common';

type TProductsWithPagination = {
  entities: IProduct[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};

const getAsyncProducts = createAsyncThunk<IProduct[], undefined, TThunkApiConfig>(
  `${NameSpace.Products}/fetchProducts`,
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<TProductsWithPagination>(APIRoute.Products);
      return data.entities;
    } catch (error) {
      throw new Error();
    }
  },
);

export { getAsyncProducts };
