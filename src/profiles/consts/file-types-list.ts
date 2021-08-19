import { IdName } from "../../core/models/interfaces/id-name";
import { FileType } from "../enums/file-type.enum";

export const fileTypesList: IdName<FileType, string>[] = [
  { id: FileType.Txt, name: 'Txt' },
  { id: FileType.Csv, name: 'Csv' },
  { id: FileType.Xlsx, name: 'Xlsx' },
  { id: FileType.Xls, name: 'Xls' }
];