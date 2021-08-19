import { FileType } from "../enums/file-type.enum";

export interface GeneratePriceSettings {
    fileName: string;
    fileType: FileType;
    emailSubject: string;
    email: string;
    scheduleTime: string[];
    commonMargin: number;
}