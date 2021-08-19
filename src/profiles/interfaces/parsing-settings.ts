import { FileType } from "../enums/file-type.enum";

export interface ParsingSettings {
    email: string;
    subject: string;
    // used in 2 places
    filename: string;
    fileType: FileType | null;
    startRow: number | null;
    articleColumn: number | null;
    brandColumn: number | null;
    nameColumn: number | null;
    quantityColumn: number | null;
    priceColumn: number | null;
    answerColumn: number | null;
    commentColumn: number | null;
}