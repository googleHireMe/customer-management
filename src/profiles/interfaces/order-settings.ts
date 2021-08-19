import { ExcludingRule } from "./excluding-rule";
import { MarginRule } from "./margin-rule";

export interface OrderSettings {
    deliveryTerms: number | null;
    isExactQuantityOrdering: boolean | null;
    priceDeviationPercent: number | null;
    excludingRules: ExcludingRule[];
    marginRules: MarginRule[];
}