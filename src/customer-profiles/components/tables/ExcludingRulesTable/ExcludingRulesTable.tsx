import React, { useEffect, useRef } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, makeStyles, IconButton, Toolbar, Tooltip } from "@material-ui/core"
import { FieldName, RegisterOptions, SetFieldValue } from "react-hook-form";
import { commonInputProps } from "../../../consts/consts";
import { ExcludingRule } from "../../../interfaces/excluding-rule";
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
  excludingRules: ExcludingRule[];
  createExcludingRule: () => void;
  register: (name: FieldName<any>, rules?: RegisterOptions) => void;
  setValue: (name: FieldName<any>, value: SetFieldValue<any>) => void;
}
function ExcludingRulesTable({ excludingRules, createExcludingRule, register, setValue }: Props) {
  const classes = useStyles();
  const lastRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    excludingRules?.forEach((item, index) => {
      for (let [key, value] of Object.entries(item)) {
        const formKey = `excludingRules[${index}].${key}`;
        register(formKey);
        setValue(formKey, value);
      }
    });
  }, [excludingRules, register, setValue]);

  const onCreateRow = () => {
    createExcludingRule();
    setTimeout(() => lastRowRef?.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 0);
  }

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <div><h5 style={{ fontWeight: 'normal' }}>Правила исключения</h5></div>
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
            </TableRow>
          </TableHead>
          <TableBody >
            {excludingRules?.map((row, index) => {
              const formKeyPart = `excludingRules[${index}]`;
              const isLastRow = index === excludingRules.length - 1;

              return (
                <TableRow
                  key={index}
                  {...(isLastRow ? { ref: lastRowRef } : null)}
                >
                  <TableCell>
                    <TextField
                      {...commonInputProps}
                      type="number"
                      defaultValue={row.pricelistId}
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

export default ExcludingRulesTable;