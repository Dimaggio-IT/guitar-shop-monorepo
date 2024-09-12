import { createAsyncThunk } from '@reduxjs/toolkit';
import { replaceURI } from '../../common';
import { TThunkApiConfig } from '../../common';
import { IProduct } from '@project/shared/core';
import { APIRoute, NameSpace } from '../../common';
import { TProductId } from '../../common';

const getAsyncProduct = createAsyncThunk<IProduct, TProductId, TThunkApiConfig>(
  `${NameSpace.Product}/fetchProduct`,
  async (productId, { extra: api }) => {
    try {
      const route = replaceURI({ uri: APIRoute.Product, productId });

      if (!route) {
        return null;
      }

      const { data } = await (api as any).get(route);
      return data;
    } catch (error) {
      throw new Error();
    }
  },
);

export { getAsyncProduct };
