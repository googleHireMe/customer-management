import { makeStyles, Button, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Checkbox } from "@material-ui/core";
import { ChangeEvent, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { commonProps } from "../../core/consts/consts";
import { ChangeEventTargetType } from "../../core/models/interfaces/change-event-target-type.enum";
import { parseChangeEvent } from "../../core/utils/parse-change-event";
import { Customer } from "../../customer-profiles/interfaces/customer";
import { RootState } from "../../store/rootReducer";
import { GenericTable } from "../../UI/GenericTable/GenericTable";
import { Panel } from "../../UI/Panel/Panel";
import { useFlexClasses } from "../../UI/styles/flex-classes";
import { useGenericClasses } from "../../UI/styles/generic-classes";
import { profileApi } from "../api/profile-api";
import { PriceDeviationPercent } from "../enums/price-deviation-percent.enum";
import { QuantityOrdering } from "../enums/quantity-ordering.enum";
import { Profile } from "../interfaces/profile";
import { createExcludingRule, createMarginRule, patchProfile, patchProfileAnswerSettings, patchProfileExcludingRule, patchProfileGeneratePriceSettings, patchProfileMarginRule, patchProfileOrderSettings, patchProfileParsingSettings, patchProfilePricelists, removeExcludingRule, removeMarginRule, setPricelistsFilter } from "../state/profile/profileSlice";
import { createProfile, loadProfile, updateProfile } from "../state/profile/profileThunks";
import ChipInput from 'material-ui-chip-input'
import { fileTypesList } from "../consts/file-types-list";
import { FormControlChangeEvent } from "../../core/models/interfaces/form-control-change-event";
import { Column } from "../../core/models/interfaces/column";
import { Pricelist } from "../interfaces/pricelist";
import { PatchObject } from "../../core/models/interfaces/patch-object";
import { ProfileTable } from "../enums/profile-table.enum";
import { ExcludingRule } from "../interfaces/excluding-rule";
import { MarginRule } from "../interfaces/margin-rule";
import { ProfileTablesTypes } from "../interfaces/profile-tables-types";
import { debounce } from "lodash";


const useStyles = makeStyles((theme) => ({
  widthLimit1000: {
    maxWidth: '1000px',
  },
  limitedTableHeight: {
    maxHeight: '500px'
  },
  widthLimit300: {
    maxWidth: '300px'
  },
  widthLimit170: {
    maxWidth: '170px'
  },
  widthLimit40: {
    maxWidth: '40px'
  },
  orderHandlingSection: {
    rowGap: '20px'
  },
  orderSetting: {
    rowGap: '15px'
  },
  fileParsingSettings: {
    columnGap: '16px',
    rowGap: '15px'
  },
  sectionOuterGap: {
    rowGap: '40px'
  },
  sectionInnerGap: {
    rowGap: '20px'
  },
  sendingSetting: {
    rowGap: '15px'
  },
  columnGap16: {
    columnGap: '16px'
  }
}));

export function ProfileDetailes() {
  const classes = useStyles();
  const genericClasses = useGenericClasses();
  const flex = useFlexClasses();

  const useDebounce = (inputHandle: (...args) => void, time: number = 2000) => useCallback(debounce(inputHandle, time), []);

  const { customerId, profileId } = useParams<{ customerId: string, profileId: string }>();

  const dispatch = useDispatch();
  const item = useSelector<RootState, Profile>(state => state.profile.profile);
  const pricelistsFilter = useSelector<RootState, string>(state => state.profile.pricelistsFilter);
  console.log({ ...item })

  useEffect(() => {
    profileApi.updateCurrentCustomerId(customerId);
    if (profileId) { dispatch(loadProfile(profileId)); }
  }, [customerId, profileId]);

  const handleProfileChange = (event: FormControlChangeEvent) => {
    dispatch(patchProfile(parseChangeEvent(event)));
  }

  const hadleArrayInputChange = (event: string[], name: string) => {
    const patch = { key: name, value: event };
    let action;
    if (name === 'emailForAnswer') { action = patchProfileAnswerSettings; }
    if (name === 'scheduleTime') { action = patchProfileGeneratePriceSettings; }
    dispatch(action(patch))
  }

  const handleAnswerSettingsChange = (event: FormControlChangeEvent) => {
    dispatch(patchProfileAnswerSettings(parseChangeEvent(event)));
  }

  const handleParsingSettingsChange = (event: FormControlChangeEvent) => {
    dispatch(patchProfileParsingSettings(parseChangeEvent(event)));
  }

  const handleOrderSettingsChange = (event: FormControlChangeEvent) => {
    dispatch(patchProfileOrderSettings(parseChangeEvent(event)));
  }

  const handleGeneratePriceSettingsChange = (event: FormControlChangeEvent) => {
    dispatch(patchProfileGeneratePriceSettings(parseChangeEvent(event)));
  }

  const appendExcludingRule = () => {dispatch(createExcludingRule());}

  const appendMarginRule = () =>  {dispatch(createMarginRule());}

  const deleteExcludingRule = (id: string) => {dispatch(removeExcludingRule(id));}

  const deleteMarginRule = (id: string) =>  {dispatch(removeMarginRule(id));}

  const handler = useCallback(debounce(handleGeneratePriceSettingsChange, 2000), []);

  
  const handleTableDataChange = (patch: PatchObject<ProfileTablesTypes>, type: ProfileTable) => {
    const actionsSet = new Map<ProfileTable, (state?: any, patch?: PatchObject<ProfileTablesTypes>) => void>()
      .set(ProfileTable.Pricelist, patchProfilePricelists)
      .set(ProfileTable.ExcludingRule, patchProfileExcludingRule)
      .set(ProfileTable.MarginRule, patchProfileMarginRule)
    const action = actionsSet.get(type);
    dispatch(action(patch));
  }

  const isExactQuantityOrdering: QuantityOrdering = item?.orderSettings?.isExactQuantityOrdering === true
    ? QuantityOrdering.FullAmount
    : QuantityOrdering.PartialAmount;
  const hadleIsExactQuantityOrderingChange = (event: ChangeEvent<{ name?: string, value: any }>) => {
    const isExactQuantityOrdering = Boolean(event.target.value);
    dispatch(patchProfileOrderSettings({ key: 'isExactQuantityOrdering', value: isExactQuantityOrdering }));
  }

  const priceDeviationPercentSelectorValue = item?.orderSettings?.priceDeviationPercent === null || item?.orderSettings?.priceDeviationPercent === undefined
    ? PriceDeviationPercent.ExactMatch
    : PriceDeviationPercent.PercentageDeviation;
  const handlePriceDeviationPercentSelectorChange = (event: ChangeEvent<{ name?: string, value: any }>) => {
    const value: PriceDeviationPercent = event.target.value;
    if (PriceDeviationPercent.ExactMatch === value) {
      dispatch(patchProfileOrderSettings({ key: 'priceDeviationPercent', value: null }));
    }
    if (PriceDeviationPercent.PercentageDeviation === value) {
      dispatch(patchProfileOrderSettings({ key: 'priceDeviationPercent', value: 0 }));
    }
  }
  const handlePriceDeviationPercentInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const percent = +event.target.value;
    dispatch(patchProfileOrderSettings({ key: 'priceDeviationPercent', value: percent }));
  }

  const save = () => {
    const action = profileId ? updateProfile : createProfile;
    dispatch(action(item));
  }

  const priceListsToCreateTitles: Column<Pricelist>[] = [
    {
      headerName: 'Вкл',
      propName: 'isIncluded',
      displayMapper: (item, key) => (
        <Checkbox
          checked={item[`${key}`] === true}
          onChange={event => {
            const patch = {  ...parseChangeEvent(event), id:  item.pricelistId, key };
            dispatch(patchProfilePricelists(patch));
          }}
        />
      )
    },
    {
      headerName: 'Наценка, %',
      propName: 'margin',
      displayMapper: (item, key) => (
        <TextField
          name='margin'
          type='number'
          value={item[`${key}`] ?? ''}
          onChange={event => {
            const patch = { ...parseChangeEvent(event), id: item.pricelistId };
            handleTableDataChange(patch, ProfileTable.Pricelist);
          }}
          className={classes.widthLimit40}
          {...commonProps}
        />
      )
    },
    {
      headerName: 'Прайс-листы',
      propName: 'name'
    },
    {
      headerName: 'Лого',
      propName: 'logo',
    },
    {
      headerName: 'Поставщик',
      propName: 'supplierName',
    },
    {
      headerName: 'Обновлен',
      propName: 'updated',
    },
    {
      headerName: 'Срок поставки, дн',
      propName: 'deliveryTerms',
    },
    {
      headerName: 'Строк',
      propName: 'rowCount',
    }
  ];

  const excludingRulesTitles: Column<ExcludingRule>[]  = [
    {
      headerName: '',
      getId: () => 'delete',
      displayMapper: (item) => (
        <Checkbox
          checked={true}
          onChange={() => {deleteExcludingRule(item._id)}}
        />
      )
    },
    {
      headerName: 'Id прайса',
      propName: 'pricelistId',
      displayMapper: (item, key) => (
        <TextField
          name='pricelistId'
          type='number'
          value={item[`${key}`] ?? ''}
          onChange={event => {
            const patch = { ...parseChangeEvent(event), id: item.pricelistId };
            handleTableDataChange(patch, ProfileTable.ExcludingRule);
          }}
          className={classes.widthLimit40}
          {...commonProps}
        />
      )
    },
    {
      headerName: 'Артикул',
      propName: 'article',
      displayMapper: (item, key) => (
        <TextField
          name='article'
          value={item[`${key}`] ?? ''}
          onChange={event => {
            const patch = { ...parseChangeEvent(event), id: item.pricelistId };
            handleTableDataChange(patch, ProfileTable.ExcludingRule);
          }}
          className={classes.widthLimit40}
          {...commonProps}
        />
      )
    },
    {
      headerName: 'Бренд',
      propName: 'brand',
      displayMapper: (item, key) => (
        <TextField
          name='brand'
          value={item[`${key}`] ?? ''}
          onChange={event => {
            const patch = { ...parseChangeEvent(event), id: item.pricelistId };
            handleTableDataChange(patch, ProfileTable.ExcludingRule);
          }}
          className={classes.widthLimit40}
          {...commonProps}
        />
      )
    }
  ];

  const marginRulesTitles: Column<MarginRule>[] = [
    {
      headerName: '',
      getId: () => 'delete',
      displayMapper: (item) => (
        <Checkbox
          checked={true}
          onChange={() => {deleteMarginRule(item._id)}}
        />
      )
    },
    {
      headerName: 'Id прайса',
      propName: 'pricelistId',
      displayMapper: (item, key) => (
        <TextField
          name='pricelistId'
          value={item[`${key}`] ?? ''}
          onChange={event => {
            const patch = { ...parseChangeEvent(event), id: item.pricelistId };
            handleTableDataChange(patch, ProfileTable.MarginRule);
          }}
          className={classes.widthLimit40}
          {...commonProps}
        />
      )
    },
    {
      headerName: 'Артикул',
      propName: 'article',
      displayMapper: (item, key) => (
        <TextField
          name='article'
          value={item[`${key}`] ?? ''}
          onChange={event => {
            const patch = { ...parseChangeEvent(event), id: item.pricelistId };
            handleTableDataChange(patch, ProfileTable.MarginRule);
          }}
          className={classes.widthLimit40}
          {...commonProps}
        />
      )
    },
    {
      headerName: 'Бренд',
      propName: 'brand',
      displayMapper: (item, key) => (
        <TextField
          name='brand'
          value={item[`${key}`] ?? ''}
          onChange={event => {
            const patch = { ...parseChangeEvent(event), id: item.pricelistId };
            handleTableDataChange(patch, ProfileTable.MarginRule);
          }}
          className={classes.widthLimit40}
          {...commonProps}
        />
      )
    },
    {
      headerName: 'Наценка, %',
      propName: 'marginPercent',
      displayMapper: (item, key) => (
        <TextField
          name='marginPercent'
          value={item[`${key}`] ?? ''}
          onChange={event => {
            const patch = { ...parseChangeEvent(event), id: item.pricelistId };
            handleTableDataChange(patch, ProfileTable.MarginRule);
          }}
          className={classes.widthLimit40}
          {...commonProps}
        />
      )
    },
    {
      headerName: 'РРЦ',
      propName: 'rrp',
      displayMapper: (item, key) => (
        <TextField
          name='rrp'
          value={item[`${key}`] ?? ''}
          onChange={event => {
            const patch = { ...parseChangeEvent(event), id: item.pricelistId };
            handleTableDataChange(patch, ProfileTable.MarginRule);
          }}
          className={classes.widthLimit40}
          {...commonProps}
        />
      )
    }
  ];

  return (
    <Panel className={`${flex.column} ${classes.sectionOuterGap}`}>
      <div className={`${flex.column} ${classes.sectionInnerGap}`}>
        <div className={genericClasses.subtitle}>
          Прайс-листы для создания
        </div>
        <GenericTable
          list={item?.pricelists ?? []}
          idKey='pricelistId'
          className={classes.limitedTableHeight}
          columns={priceListsToCreateTitles}
          filterSettings={{
            filterByPropsList: ['name', 'logo'],
            placeholder: 'Название, лого',
            currentValue: pricelistsFilter,
            handleUpdate: (value) => { dispatch(setPricelistsFilter(value)) }
          }}
        />
      </div>

      <div className={`${flex.column} ${classes.sectionInnerGap}`}>
        <div className={genericClasses.subtitle}>
          Правила исключений
        </div>
        <GenericTable
          list={item?.orderSettings?.excludingRules ?? []}
          idKey='_id'
          className={`${classes.limitedTableHeight} ${classes.widthLimit1000}`}
          columns={excludingRulesTitles}
          createButtonSettings={{
            text: 'Добавить',
            placement: 'bottom',
            handleClick: appendExcludingRule
          }}
        />
      </div>

      <div className={`${flex.column} ${classes.sectionInnerGap}`}>
        <div className={genericClasses.subtitle}>
          Правила наценки
        </div>
        <GenericTable
          list={item?.orderSettings?.marginRules ?? []}
          idKey='_id'
          useGuidForId={true}
          className={`${classes.limitedTableHeight} ${classes.widthLimit1000}`}
          columns={marginRulesTitles}
          createButtonSettings={{
            text: 'Добавить',
            placement: 'bottom',
            handleClick: appendMarginRule
          }}
        />
      </div>

      <div className={`${flex.column} ${classes.sectionInnerGap}`}>
        <div className={genericClasses.subtitle}>
          Обработка заказов из файла
        </div>
        <div className={`${flex.column} ${classes.orderSetting}`}>
          <div className={genericClasses.subtitleSm}>
            Настройки для заказов
          </div>
          <TextField
            name='email'
            value={item?.parsingSettings?.email ?? ''}
            onChange={handleParsingSettingsChange}
            label="Почта отправки заказов"
            variant="outlined"
            className={classes.widthLimit300}
            {...commonProps}
          />
          <TextField
            name='filename'
            value={item?.parsingSettings?.filename ?? ''}
            onChange={handleParsingSettingsChange}
            label="Название файла"
            variant="outlined"
            className={classes.widthLimit300}
            {...commonProps}
          />
          <TextField
            name='subject'
            value={item?.parsingSettings?.subject ?? ''}
            onChange={handleParsingSettingsChange}
            label="Тема письма"
            variant="outlined"
            className={classes.widthLimit300}
            {...commonProps}
          />
          <ChipInput
            value={item?.answerSettings?.emailForAnswer}
            onChange={(event) => { hadleArrayInputChange(event, 'emailForAnswer') }}
            label="Почта отправки ответов по заказам"
            variant="outlined"
            className={classes.widthLimit300}
            alwaysShowPlaceholder={false}
            {...commonProps}
          />
          <FormControl variant="outlined" className={classes.widthLimit300}>
            <InputLabel>Формат</InputLabel>
            <Select
              name="fileType"
              value={item?.parsingSettings?.fileType ?? ''}
              onChange={handleParsingSettingsChange}
              label="Формат"
              {...commonProps}
            >
              {fileTypesList?.map(fileType => <MenuItem
                key={fileType.id}
                value={fileType.id}>
                {fileType.name}
              </MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            name='deliveryTerms'
            value={item?.orderSettings?.deliveryTerms ?? ''}
            onChange={handleOrderSettingsChange}
            type='number'
            label="Срок поставки, дн"
            variant="outlined"
            className={classes.widthLimit170}
            {...commonProps}
          />
          <div className={`${flex.flexStart} ${classes.columnGap16}`}>
            <FormControl variant="outlined" className={classes.widthLimit300}>
              <InputLabel>Цена</InputLabel>
              <Select
                value={priceDeviationPercentSelectorValue}
                label="Цена"
                onChange={handlePriceDeviationPercentSelectorChange}
                {...commonProps}
              >
                <MenuItem value={PriceDeviationPercent.ExactMatch}>Точное совпадение</MenuItem>
                <MenuItem value={PriceDeviationPercent.PercentageDeviation}>Отклонение в %</MenuItem>
              </Select>
            </FormControl>
            {priceDeviationPercentSelectorValue === PriceDeviationPercent.PercentageDeviation
              ? <TextField
                name='deliveryTerms'
                value={item?.orderSettings?.priceDeviationPercent ?? ''}
                onChange={handlePriceDeviationPercentInputChange}
                type='number'
                variant="outlined"
                className={classes.widthLimit170}
                {...commonProps}
              />
              : null
            }
          </div>
          <FormControl variant="outlined" className={classes.widthLimit300}>
            <InputLabel>Заказывать</InputLabel>
            <Select
              value={isExactQuantityOrdering}
              onChange={hadleIsExactQuantityOrderingChange}
              label="Заказывать"
              {...commonProps}
            >
              <MenuItem value={QuantityOrdering.PartialAmount}>Частичное кол-во</MenuItem>
              <MenuItem value={QuantityOrdering.FullAmount}>Полное кол-во из заказа</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={genericClasses.subtitleSm}>
          Порядок колонок в файле с заказом
        </div>
        <div className={`${flex.flexWrap} ${classes.fileParsingSettings}`}>
          <TextField
            name='startRow'
            value={item?.parsingSettings?.startRow ?? ''}
            onChange={handleParsingSettingsChange}
            label="Начало заказа"
            variant="outlined"
            type="number"
            className={classes.widthLimit170}
            {...commonProps}
          />
          <TextField
            name='articleColumn'
            value={item?.parsingSettings?.articleColumn ?? ''}
            onChange={handleParsingSettingsChange}
            label="Артикул"
            variant="outlined"
            type="number"
            className={classes.widthLimit170}
            {...commonProps}
          />
          <TextField
            name='brandColumn'
            value={item?.parsingSettings?.brandColumn ?? ''}
            onChange={handleParsingSettingsChange}
            label="Бренд"
            variant="outlined"
            type="number"
            className={classes.widthLimit170}
            {...commonProps}
          />
          <TextField
            name='nameColumn'
            value={item?.parsingSettings?.nameColumn ?? ''}
            onChange={handleParsingSettingsChange}
            label="Наименование"
            variant="outlined"
            type="number"
            className={classes.widthLimit170}
            {...commonProps}
          />
          <TextField
            name='answerColumn'
            value={item?.parsingSettings?.answerColumn ?? ''}
            onChange={handleParsingSettingsChange}
            label="Ответ"
            variant="outlined"
            type="number"
            className={classes.widthLimit170}
            {...commonProps}
          />
          <TextField
            name='commentColumn'
            value={item?.parsingSettings?.commentColumn ?? ''}
            onChange={handleParsingSettingsChange}
            label="Комментарий"
            variant="outlined"
            type="number"
            className={classes.widthLimit170}
            {...commonProps}
          />
          <TextField
            name='priceColumn'
            value={item?.parsingSettings?.priceColumn ?? ''}
            onChange={handleParsingSettingsChange}
            label="Цена"
            variant="outlined"
            type="number"
            className={classes.widthLimit170}
            {...commonProps}
          />
          <TextField
            name='quantityColumn'
            value={item?.parsingSettings?.quantityColumn ?? ''}
            onChange={handleParsingSettingsChange}
            label="Количество"
            variant="outlined"
            type="number"
            className={classes.widthLimit170}
            {...commonProps}
          />
          <RadioGroup row>
            <FormControlLabel value="1" control={<Radio />} label="Подтвержденное" />
            <FormControlLabel value="2" control={<Radio />} label="С сигналом" />
          </RadioGroup>
        </div>
      </div>

      <div className={`${flex.column} ${classes.sectionInnerGap}`}>
        <div className={genericClasses.subtitle}>
          Настройки для отправки
        </div>
        <div className={`${flex.column} ${classes.sendingSetting}`}>
          <TextField
            name='title'
            value={item?.title ?? ''}
            onChange={handleProfileChange}
            label="Название прайса"
            variant="outlined"
            className={classes.widthLimit300}
            {...commonProps}
          />
          <TextField
            name='fileName'
            value={item?.generatePriceSettings?.fileName ?? ''}
            onChange={handleGeneratePriceSettingsChange}
            label="Название файла"
            variant="outlined"
            className={classes.widthLimit300}
            {...commonProps}
          />
          <TextField
            name='emailSubject'
            value={item?.generatePriceSettings?.emailSubject ?? ''}
            onChange={handleGeneratePriceSettingsChange}
            label="Тема письма"
            variant="outlined"
            className={classes.widthLimit300}
            {...commonProps}
          />
          <TextField
            name='email'
            value={item?.generatePriceSettings?.email ?? ''}
            onChange={handleGeneratePriceSettingsChange}
            label="Электронная почта для получения"
            variant="outlined"
            className={classes.widthLimit300}
            {...commonProps}
          />
          <FormControl variant="outlined" className={classes.widthLimit300}>
            <InputLabel>Формат</InputLabel>
            <Select
              name="fileType"
              value={item?.generatePriceSettings?.fileType ?? ''}
              onChange={handleGeneratePriceSettingsChange}
              label="Формат"
              {...commonProps}
            >
              {fileTypesList?.map(fileType => <MenuItem
                key={fileType.id}
                value={fileType.id}>
                {fileType.name}
              </MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.widthLimit300}>
            <InputLabel>Как часто отправлять</InputLabel>
            <Select
              value={1}
              label="Как часто отправлять"
              {...commonProps}
            >
              <MenuItem value={1}>Каждый день</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField
            name='scheduleTime'
            value={item?.generatePriceSettings?.scheduleTime ?? ''}
            onChange={hadleGeneratePriceSettingsChange}
            label="Часы отправки, через заяпятую"
            variant="outlined"
            className={classes.widthLimit300}
            {...commonProps}
          /> */}
          <ChipInput
            value={item?.generatePriceSettings?.scheduleTime}
            onChange={(event) => { hadleArrayInputChange(event, 'scheduleTime') }}
            label="Часы отправки, через заяпятую"
            variant="outlined"
            className={classes.widthLimit300}
            alwaysShowPlaceholder={false}
            {...commonProps}
          />
          <TextField
            name='commonMargin'
            value={item?.generatePriceSettings?.commonMargin ?? ''}
            onChange={handleGeneratePriceSettingsChange}
            label="Общая наценка, %"
            variant="outlined"
            type='number'
            className={classes.widthLimit170}
            {...commonProps}
          />
        </div>
      </div>

      <div className={`${flex.flexStart} ${flex.fullWidth}`}>
        <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          onClick={save}
        >
          Сохранить
        </Button>
      </div>
    </Panel>
  )
}