import { GoodsRange } from "../enums/goods-range";

export const goodsToDisplayNamesMap = new Map<GoodsRange, string>()
  .set(GoodsRange.Original, 'Оригинал')
  .set(GoodsRange.NotOriginal, 'Не оригинал');