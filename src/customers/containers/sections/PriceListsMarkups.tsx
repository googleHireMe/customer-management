import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Column } from "../../../core/models/interfaces/column";
import { RootState } from "../../../store/rootReducer";
import { GenericTable } from "../../../UI/GenericTable/GenericTable";
import { Panel } from "../../../UI/Panel/Panel";
import { pricelistMarkupApi } from "../../api/pricelist-markup-api";
import { goodsToDisplayNamesMap } from "../../consts/consts";
import { GoodsRange } from "../../enums/goods-range";
import { PricelistMarkup } from "../../interfaces/customer-pricelist-markup";
import { loadPriceListsMarkups } from "../../state/customer/customerThunks";
import { setPricelistsMarkupsFilter } from "../../state/customer/customerSlice";


const useStyles = makeStyles((theme) => ({
}));

export function PriceListsMarkups() {
  const classes = useStyles();

  const { customerId: id } = useParams<{ customerId: string }>();

  const dispatch = useDispatch();
  const list = useSelector<RootState, PricelistMarkup[]>(state => state.customer.pricelistsMarkups);
  const filter = useSelector<RootState, string>(state => state.customer.pricelistsMarkupsFilter);

  useEffect(() => {
    pricelistMarkupApi.updateCurrentCustomerId(id);
    if (id) { dispatch(loadPriceListsMarkups()); }
  }, [id]);

  const updateFilter = (value: string) => { dispatch(setPricelistsMarkupsFilter(value));}

  const columns: Column<PricelistMarkup>[] = [
    {
      headerName: '',
      propName: 'enabled'
    },
    {
      headerName: 'Наценка, %',
      propName: 'markup'
    },
    {
      headerName: 'Прайс-листы',
      propName: 'title'
    },
    {
      headerName: 'Лого',
      propName: 'logo'
    },
    {
      headerName: 'Поставщик',
      propName: 'supplierTitle'
    },
    {
      headerName: 'Тип товара',
      propName: 'goodsRange',
      displayMapper: (item, key) => {
        const enumValuesList = item[key] as GoodsRange[];
        const displayString = enumValuesList?.reduce((accumulator, currentValue) => `${accumulator} ${goodsToDisplayNamesMap.get(currentValue)}`, '');
        return displayString;
      }
    },
    {
      headerName: 'Сроки поставки, дн',
      propName: 'deliveryTerms'
    },
    {
      headerName: 'Строк',
      propName: 'rowCount'
    }
  ];

  return (
    <Panel>
      <GenericTable
        list={list}
        idKey="pricelistId"
        columns={columns}
        useGuidForId={true}
        filterSettings={{
          filterByPropsList: ['title', 'logo'],
          placeholder: 'Название, лого',
          currentValue: filter,
          handleUpdate: updateFilter
        }}
      />
    </Panel>
  )
}