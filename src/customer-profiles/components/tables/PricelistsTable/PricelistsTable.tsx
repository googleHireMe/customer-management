import React, { useEffect, useRef } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, makeStyles, Checkbox, IconButton, Toolbar, Tooltip } from "@material-ui/core"
import { Pricelist } from "../../../interfaces/pricelist";
import { Controller, FieldName, RegisterOptions, SetFieldValue } from "react-hook-form";
import { commonInputProps } from "../../../consts/consts";
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles({
  container: {
    maxHeight: 440
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});
interface Props {
  pricelists: Pricelist[];
  control: any;
  createPricelist: () => void;
  register: (name: FieldName<any>, rules?: RegisterOptions) => void;
  setValue: (name: FieldName<any>, value: SetFieldValue<any>) => void;
}
function PricelistsTable({ pricelists, control, createPricelist, register, setValue }: Props) {
  const classes = useStyles();
  const lastRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    pricelists?.forEach((item, index) => {
      for (let [key, value] of Object.entries(item)) {
        const formKey = `pricelists[${index}].${key}`;
        register(formKey);
        setValue(formKey, value);
      }
    });
  }, [pricelists, register, setValue]);

  const onCreateRow = () => {
    createPricelist();
    setTimeout(() => lastRowRef?.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 0);
  }

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Tooltip title="Добавить строку">
          <IconButton onClick={onCreateRow}>
            <Add />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="medium" >
          <TableHead>
            <TableRow>
              <TableCell>Включен</TableCell>
              <TableCell>Наценка</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Поставщик</TableCell>
              <TableCell>Лого</TableCell>
              <TableCell>Дата обновления</TableCell>
              <TableCell>Сроки поставки</TableCell>
              <TableCell>Кол-во строк</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pricelists?.map((row, index) => {
              const formKeyPart = `pricelists[${index}]`;
              const isLastRow = index === pricelists.length - 1;

              return (
                <TableRow
                  key={index}
                  {...(isLastRow ? { ref: lastRowRef } : null)}
                >
                  <TableCell>
                    <Controller
                      name={`${formKeyPart}.isIncluded`}
                      control={control}
                      defaultValue={false}
                      render={(props) => (
                        <Checkbox
                          {...props}
                          checked={props.value ?? false}
                          onChange={(e) => props.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      defaultValue={row.margin}
                      type="number"
                      onChange={(e) => setValue(`${formKeyPart}.margin`, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      defaultValue={row.pricelistId}
                      type="number"
                      onChange={(e) => setValue(`${formKeyPart}.pricelistId`, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      defaultValue={row.name}
                      onChange={(e) => setValue(`${formKeyPart}.name`, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      defaultValue={row.supplierName}
                      onChange={(e) => setValue(`${formKeyPart}.supplierName`, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      defaultValue={row.logo}
                      onChange={(e) => setValue(`${formKeyPart}.logo`, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      defaultValue={row.updated}
                      onChange={(e) => setValue(`${formKeyPart}.updated`, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      type="number"
                      defaultValue={row.deliveryTerms}
                      onChange={(e) => setValue(`${formKeyPart}.deliveryTerms`, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      defaultValue={row.rowCount}
                      type="number"
                      onChange={(e) => setValue(`${formKeyPart}.rowCount`, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              )
            }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper >
  );
}

export default PricelistsTable;