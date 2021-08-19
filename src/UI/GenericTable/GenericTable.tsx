import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, makeStyles, IconButton, Toolbar, InputAdornment, Button } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Column } from "../../core/models/interfaces/column";
import { useFlexClasses } from "../styles/flex-classes";
import { defaultPropertyMapper } from "./list-items-mappers/default-mapper";
import { v4 as uuid } from 'uuid';
import { applyFilter } from "../../core/utils/apply-filter";

export interface FilterSettings<T> {
  filterByPropsList: Array<keyof(T)>,
  placeholder: string;
  currentValue: string;
  handleUpdate: (updatedFilterValue: string) => void;
}


export interface CreateButtonSettings {
  text: string;
  placement?: 'header' | 'bottom'
  handleClick: () => void;
}

const useStyles = makeStyles({
  toolbar: {
    padding: '0px'
  },
  searchControl: {
    maxWidth: '280px'
  },
  header: {
    '& *': {
      backgroundColor: '#FFFFFF',
      textTransform: 'uppercase',
      color: '#A6B0B8'
    }
  }
});
interface Props<T> {
  columns: Column<T>[];
  list: T[];
  idKey: string | number;
  className?: string;
  useGuidForId?: boolean;
  filterSettings?: FilterSettings<T>;
  createButtonSettings?: CreateButtonSettings;
  properyMapper?: (item: T, property: keyof (T)) => JSX.Element | T[keyof(T)];
}
export function GenericTable<T>({
  columns,
  className: inputClassName,
  list,
  idKey,
  createButtonSettings,
  filterSettings,
  useGuidForId = false,
  properyMapper = defaultPropertyMapper,
  // TODO: REMOVE AND PROVIDE UNICUE ID FROM BACK END!
}: Props<T>) {
  const classes = useStyles();
  const flex = useFlexClasses();
  let filterBar, createButton;

  if (filterSettings) {
    const { filterByPropsList, currentValue } = filterSettings;
    list = applyFilter(list, filterByPropsList, currentValue)

    filterBar = <TextField
      className={classes.searchControl}
      name="filter"
      value={filterSettings.currentValue ?? ''}
      onChange={(event) => { filterSettings.handleUpdate(event.target.value) }}
      label={filterSettings.placeholder}
      variant="outlined"
      fullWidth={true}
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <IconButton
              color="default">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
      }}
    />
  };

  if (createButtonSettings) {
    createButton = (<Button
      onClick={createButtonSettings.handleClick}
      size="medium"
      variant="contained"
      color="primary"
    >
      {createButtonSettings.text}
    </Button>
    );
  }

  return (
    <>
      <Paper elevation={0}>
        {filterSettings || createButtonSettings && createButtonSettings.placement !== 'bottom'
          ? <Toolbar className={`${classes.toolbar} ${flex.spaceBetween} ${flex.flexWrap}`}>
            <div>
              {filterSettings ? filterBar : null}
            </div>
            <div>
              {createButtonSettings ? createButton : null}
            </div>
          </Toolbar>
          : null}
        <TableContainer className={inputClassName}>
          <Table stickyHeader size="medium" >
            <TableHead className={classes.header}>
              <TableRow>
                {columns.map(({ headerName, getId }) => <TableCell key={headerName ?? getId()}>{headerName}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map(item =>
                <TableRow key={useGuidForId ? uuid() : item[idKey]}>
                  {columns.map(column => <TableCell key={column.headerName ?? column.getId()}>
                    <>
                      {
                        column.displayMapper
                          ? column.displayMapper(item, column.propName)
                          : properyMapper(item, column.propName)
                      }
                    </>
                  </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper >
      {createButtonSettings?.placement === 'bottom'
        ? <div className={flex.flexStart}>
          {createButton}
        </div>
        : null}
    </>
  );
}