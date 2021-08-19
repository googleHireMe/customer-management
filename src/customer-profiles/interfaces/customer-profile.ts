import { AnswerSettings } from "./answer-settings";
import { CustomerProfileMainSettings } from "./main-customer-profile";
import { OrderSettings } from "./order-settings";
import { ParsingSettings } from "./parsing-settings";
import { Pricelist } from "./pricelist";

export interface CustomerProfile extends CustomerProfileMainSettings {
    orderSettings?: OrderSettings;
    parsingSettings?: ParsingSettings;
    answerSettings?: AnswerSettings;
    includedPricelists?: Pricelist[];
}