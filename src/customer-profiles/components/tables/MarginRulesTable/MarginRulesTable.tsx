import React, { useEffect, useRef } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, makeStyles, IconButton, Toolbar, Tooltip } from "@material-ui/core"
import { FieldName, RegisterOptions, SetFieldValue } from "react-hook-form";
import { commonInputProps } from "../../../consts/consts";
import { MarginRule } from "../../../interfaces/margin-rule";
import Add from "@material-ui/icons/Add";

const useStyles = makeStyles({
  container: {
    maxHeight: 440
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

interface Props {
  marginRules: MarginRule[];
  createMarginRule: () => void;
  register: (name: FieldName<any>, rules?: RegisterOptions) => void;
  setValue: (name: FieldName<any>, value: SetFieldValue<any>) => void;
}
function MarginRulesTable({ marginRules, register, createMarginRule, setValue }: Props) {
  const classes = useStyles();
  const lastRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    marginRules?.forEach((item, index) => {
      for (let [key, value] of Object.entries(item)) {
        const formKey = `marginRules[${index}].${key}`;
        register(formKey);
        setValue(formKey, value);
      }
    });
  }, [marginRules, register, setValue]);

  const onCreateRow = () => {
    createMarginRule();
    setTimeout(() => lastRowRef?.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 0);
  }

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <div><h5 style={{ fontWeight: 'normal' }}>Правила наценки</h5></div>
        <Tooltip title="Добавить строку">
          <IconButton onClick={onCreateRow}>
            <Add/>
          </IconButton>
        </Tooltip>
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="medium" >
          <TableHead>
            <TableRow>
              <TableCell>Id прайслиста</TableCell>
              <TableCell>Артикул</TableCell>
              <TableCell>Бренд</TableCell>
              <TableCell>Процент наценки</TableCell>
              <TableCell>RRP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {marginRules?.map((row, index) => {
              const formKeyPart = `marginRules[${index}]`;
              const isLastRow = index === marginRules.length - 1;

              return (
                <TableRow
                  key={index}
                  {...(isLastRow ? { ref: lastRowRef } : null)}
                >
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
                      defaultValue={row.article}
                      onChange={(e) => setValue(`${formKeyPart}.article`, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      defaultValue={row.brand}
                      onChange={(e) => setValue(`${formKeyPart}.brand`, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      defaultValue={row.marginPercent}
                      type="number"
                      onChange={(e) => setValue(`${formKeyPart}.marginPercent`, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      defaultValue={row.rrp}
                      type="number"
                      onChange={(e) => setValue(`${formKeyPart}.rrp`, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              )
            }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MarginRulesTable;