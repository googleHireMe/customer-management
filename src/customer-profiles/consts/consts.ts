import { makeStyles } from "@material-ui/core";
import { FileTypeEnum } from "../enums/file-type.enum";
import { FileType } from "../interfaces/file-type";

export const commonInputProps = {
  fullWidth: true,
  InputLabelProps: { shrink: true }
}

export const commonCustomerProfileStyles = makeStyles({
  cardActions: {
    margin: 20,
    justifyContent: 'flex-end'
  },
  verticalFormFieldMargin: {
    marginTop: 10,
    marginBottom: 10
  },
  cardMargin: {
    marginTop: 20,
    marginBottom: 20
  }
});

export const fileTypesList: FileType[] = [
  { id: FileTypeEnum.Txt, name: 'Txt' },
  { id: FileTypeEnum.Csv, name: 'Csv' },
  { id: FileTypeEnum.Xlsx, name: 'Xlsx' },
  { id: FileTypeEnum.Xls, name: 'Xls' }
];