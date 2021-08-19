import { FileTypeEnum } from "../enums/file-type.enum";

export interface ParsingSettings {
  email?: string;
  subject?: string;
  filename?: string;
  fileType?: FileTypeEnum;
  startRow?: number;
  articleColumn?: number;
  brandColumn?: number;
  nameColumn?: number;
  quantityColumn?: number;
  priceColumn?: number;
  answerColumn?: number;
  commentColumn?: number;
}