import { ExcludingRule } from "./excluding-rule";
import { MarginRule } from "./margin-rule";

export interface OrderSettings {
  deliveryTerms?: number;
  isExactQuantityOrdering?: boolean;
  excludingRules?: ExcludingRule[];
  marginRules?: MarginRule[];
}