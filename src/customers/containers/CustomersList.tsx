import { makeStyles, MenuItem } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { Column } from "../../core/models/interfaces/column";
import { CustomerProfileListItem } from "../../customer-profiles/interfaces/customer-profile-list-item";
import { RootState } from "../../store/rootReducer";
import { ActionsMenu } from "../../UI/ActionsMenu/ActionsMenu";
import { GenericTable } from "../../UI/GenericTable/GenericTable";
import { useFlexClasses } from "../../UI/styles/flex-classes";
import { CustomersListItem } from "../interfaces/customers-list-item";
import { removeCustomer, setCustomersListFilter } from "../state/customersList/customersListSlice";
import { loadCustomersList } from "../state/customersList/customersListThunks";
import { Panel } from "../../UI/Panel/Panel";

const useStyles = makeStyles({
  header: {
    '& *': {
      backgroundColor: '#FFFFFF',
      textTransform: 'uppercase',
      color: '#A6B0B8'
    }
  }
});

export function CustomersList() {
  const classes = useStyles();
  const flex = useFlexClasses();

  const history = useHistory();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const list = useSelector<RootState, CustomersListItem[]>(state => state.customersList.list);
  const filter = useSelector<RootState, string>(state => state.customersList.filter);

  useEffect(() => {
    dispatch(loadCustomersList())
  }, [dispatch]);

  const create = () => { history.push(`${url}/create`); }
  const edit = (id: number) => { history.push(`${url}/${id}`); }
  const remove = (id: number) => { dispatch(removeCustomer(id)) };
  const updateFilter = (value: string) => { dispatch(setCustomersListFilter(value)); }


  const columns: Column<CustomerProfileListItem>[] = [
    {
      headerName: 'ID',
      propName: 'id'
    },
    {
      headerName: 'Название',
      propName: 'title'
    },
    {
      headerName: 'Внутр. название',
      propName: 'internalTitle'
    },
    {
      headerName: 'Телефон',
      propName: 'phone'
    },
    {
      headerName: 'Эл. почта',
      propName: 'email'
    },
    {
      headerName: 'Наценка, %',
      propName: 'margin'
    },
    {
      headerName: 'Баланс, руб.',
      propName: 'balance'
    },
    {
      headerName: 'Расчет',
      propName: 'paymentTypes'
    },
    {
      headerName: 'Тип товара',
      propName: 'goodsRange'
    },
    {
      headerName: 'Работает через',
      propName: 'sigmaUsage'
    },
    {
      headerName: 'Зарегистрирован',
      propName: 'registrationDate'
    },
    {
      headerName: 'Статус',
      propName: 'status'
    },
    {
      getId: () => 'actions',
      displayMapper: (profile: CustomerProfileListItem) => (
        <div>
          <ActionsMenu>
            <MenuItem onClick={() => { edit(profile.id) }}>Войти</MenuItem>
            <MenuItem onClick={() => { edit(profile.id) }}>Редактировать</MenuItem>
            <MenuItem onClick={() => { remove(profile.id) }}>Удалить</MenuItem>
          </ActionsMenu>
        </div>
      )
    }
  ];

  return (
    <Panel>
      <GenericTable
        columns={columns}
        list={list}
        idKey="id"
        createButtonSettings={{
          text: 'Создать клиента',
          handleClick: create
        }}
        filterSettings={{
          filterByPropsList: ['id', 'title', 'internalTitle', 'phone', 'email'],
          placeholder: 'ID, название, контакты',
          currentValue: filter,
          handleUpdate: updateFilter
        }}
      />
    </Panel>
  );
}