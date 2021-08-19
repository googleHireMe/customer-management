export interface Pricelist {
    pricelistId: number;
    name: string;
    supplierName: string;
    logo: string;
    updated: string;
    deliveryTerms: number | null;
    rowCount: number | null;
    isIncluded: boolean | null;
    margin: number | null;
}