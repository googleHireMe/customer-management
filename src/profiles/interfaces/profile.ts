import { AnswerSettings } from "./answer-settings";
import { GeneratePriceSettings } from "./generate-price-settings";
import { OrderSettings } from "./order-settings";
import { ParsingSettings } from "./parsing-settings";
import { Pricelist } from "./pricelist";

export interface Profile {
    id: string;
    customerId: number;
    title: string;
    orderSettings: OrderSettings;
    parsingSettings: ParsingSettings;
    answerSettings: AnswerSettings;
    generatePriceSettings: GeneratePriceSettings;
    pricelists: Pricelist[];
}