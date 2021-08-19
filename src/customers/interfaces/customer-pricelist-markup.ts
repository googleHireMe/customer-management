import { GoodsRange } from "../enums/goods-range";

export interface PricelistMarkup {
    pricelistId: string;
    title: string;
    supplierTitle: string;
    logo: string;
    deliveryTerms: number;
    goodsRange: GoodsRange[];
    rowCount: number;
    enabled: boolean;
    enabledForUser: boolean;
    markup: number;
}