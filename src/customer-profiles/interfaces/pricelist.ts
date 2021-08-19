export interface Pricelist {
    pricelistId: number;
    name?: string;
    supplierName?: string;
    logo?: string;
    updated?: Date | string;
    deliveryTerms?: number;
    rowCount?: number;
    isIncluded?: boolean;
    margin?: number;
}