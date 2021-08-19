import { makeStyles, TextField, FormControlLabel, Checkbox, TextareaAutosize, Button, Switch } from "@material-ui/core";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { commonProps as externalCommonProps } from "../../../core/consts/consts";
import { RootState } from "../../../store/rootReducer";
import { Panel } from "../../../UI/Panel/Panel";
import { useFlexClasses } from "../../../UI/styles/flex-classes";
import { useGenericClasses } from "../../../UI/styles/generic-classes";
import { GoodsRange } from "../../enums/goods-range";
import { PaymentType } from "../../enums/payment-type";
import { SigmaUsageOptions } from "../../enums/sigma-usage-options";
import { CustomerGeneralData } from "../../interfaces/customer-general-data";
import { patchCustomerGeneralData, patchOptionsArray } from "../../state/customer/customerSlice";
import { createCustomer, updateCustomer } from "../../state/customer/customerThunks";

const useStyles = makeStyles((theme) => ({
  container: {
    columnGap: '64px',
    rowGap: '50px'
  },
  balance: {
    color: '#6C757C'
  },
  generalDataSection: {
    rowGap: '20px'
  },
  inlineFormGap: {
    columnGap: '20px'
  },
  balanceBlock: {
    minHeight: '40px',
    columnGap: '18px'
  },
  checkboxGap: {
    columnGap: '20px'
  },
  commentsTextArea: {
    padding: '5px 20px',
    overflowX: 'hidden',
    minWidth: '411px'
  }
}));

export function GenericInformation() {
  const classes = useStyles();
  const flex = useFlexClasses();
  const genericClasses = useGenericClasses();

  const { customerId: id } = useParams<{ customerId: string }>();

  const dispatch = useDispatch();
  const item = useSelector<RootState, CustomerGeneralData>(state => state.customer.customerGeneralData);
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;
    const { name: key, value} = target;
    console.log({key, value});
    dispatch(patchCustomerGeneralData({ key, value }));
  }
  const commonProps = { ...externalCommonProps, onChange: handleInputChange };

  const handleOptionsCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, checked, value} = target;
    console.log({name, checked, value});
    dispatch(patchOptionsArray({ key: name, value: +value, shouldBeInTheList: checked }));
  }

  const save = () => { dispatch(id ? updateCustomer(item) : createCustomer(item)); }

  return (
    <Panel>
      <div className={`${classes.container} ${flex.flexStart} ${flex.flexWrap}`}>
        <div className={`${classes.generalDataSection} ${flex.column}`}>
          <div className={genericClasses.subtitle}>
            Данные
          </div>
          <div className={`${classes.inlineFormGap} ${flex.spaceBetween}`}>
            <TextField
              name="id"
              label="Id"
              value={item?.id ?? ''}
              disabled={true}
              {...commonProps}
            />
            <TextField
              name="registrationDate"
              label="Дата регистрации"
              value={item?.registrationDate ?? ''}
              disabled={true}
              {...commonProps}
            />
          </div>
          <TextField
            name="title"
            label="Название компании"
            variant="outlined"
            value={item?.title ?? ''}
            disabled={true}
            {...commonProps}
          />
          <TextField
            className={flex.halfOfWidth}
            name="margin"
            label="Наценка, %"
            variant="outlined"
            value={item?.margin ?? ''}
            disabled={true}
            {...commonProps}
          />
          <TextField
            className={flex.halfOfWidth}
            name="phone"
            label="Телефон"
            variant="outlined"
            value={item?.phone ?? ''}
            disabled={true}
            {...commonProps}
          />
          <TextField
            name="email"
            label="Электронная почта"
            variant="outlined"
            value={item?.email ?? ''}
            disabled={true}
            {...commonProps}
          />
          <TextField
            name="deliveryAddress"
            label="Адрес грузополучателя"
            variant="outlined"
            value={item?.deliveryAddress ?? ''}
            disabled={true}
            {...commonProps}
          />
          <div className={`${classes.inlineFormGap} ${flex.spaceBetween}`}>
            <TextField
              name="contractNumber"
              label="Номер договора"
              variant="outlined"
              value={item?.contractNumber ?? ''}
              disabled={true}
              {...commonProps}
            />
            <TextField
              name="contractDate"
              label="Дата договора"
              variant="outlined"
              value={item?.contractDate ?? ''}
              disabled={true}
              {...commonProps}
            />
          </div>
        </div>

        <div className={`${classes.generalDataSection} ${flex.column}`}>
          <div className={`${classes.balanceBlock} ${flex.flexStart}`}>
            <div className={genericClasses.subtitle}>Баланс </div><div className={`${genericClasses.subtitle} ${classes.balance}`}>50 000 руб</div>
          </div>
          <div>
            <div className={genericClasses.subtitle}>Тип товара</div>
            <div className={`${flex.flexStart} ${classes.checkboxGap}`}>
              <FormControlLabel
                label="Оригинал"
                control={<Checkbox 
                  name="goodsRange" 
                  value={GoodsRange.Original}
                  checked={item?.goodsRange.some(v => v === GoodsRange.Original) ?? false}
                  onChange={handleOptionsCheckboxChange}
                />}
              />
              <FormControlLabel
                label="Неоригинал"
                control={<Checkbox 
                  name="goodsRange" 
                  value={GoodsRange.NotOriginal}
                  checked={item?.goodsRange.some(v => v === GoodsRange.NotOriginal) ?? false}
                  onChange={handleOptionsCheckboxChange}
                />}
              />
            </div>
          </div>
          <div>
            <div className={genericClasses.subtitle}>Тип расчета</div>

            <div className={`${flex.flexStart} ${classes.checkboxGap}`}>
              <FormControlLabel
                label="Наличный"
                control={<Checkbox 
                  name="paymentTypes" 
                  value={PaymentType.Cache}
                  checked={item?.paymentTypes.some(v => v === PaymentType.Cache) ?? false}
                  onChange={handleOptionsCheckboxChange}
                />}
              />
              <FormControlLabel
                label="Безналичный"
                control={<Checkbox
                  name="paymentTypes"
                  value={PaymentType.BankAccount}
                  checked={item?.paymentTypes.some(v => v === PaymentType.BankAccount) ?? false}
                  onChange={handleOptionsCheckboxChange}
                />}
              />
            </div>
          </div>
          <div>
            <div className={genericClasses.subtitle}>Работает через</div>
            <div className={`${flex.flexStart} ${classes.checkboxGap}`}>
              <FormControlLabel
                label="Сайт"
                control={<Checkbox 
                  name="sigmaUsage" 
                  value={SigmaUsageOptions.Website}
                  checked={item?.sigmaUsage.some(v => v === SigmaUsageOptions.Website) ?? false}
                  onChange={handleOptionsCheckboxChange}
                />}
              />
              <FormControlLabel
                label="Файл"
                control={<Checkbox
                  name="sigmaUsage"
                  value={SigmaUsageOptions.File}
                  checked={item?.sigmaUsage.some(v => v === SigmaUsageOptions.File) ?? false}
                  onChange={handleOptionsCheckboxChange}
                />}
              />
              <FormControlLabel
                label="API"
                control={<Checkbox
                  name="sigmaUsage"
                  value={SigmaUsageOptions.Api}
                  checked={item?.sigmaUsage.some(v => v === SigmaUsageOptions.Api) ?? false}
                  onChange={handleOptionsCheckboxChange}
                />}
              />
            </div>
          </div>
          <div>
            <div className={genericClasses.subtitle}>Статус</div>
            <Switch
              checked={false}
              disabled={true}
              onChange={(e) => { }}
              name="checkedA"
            />
          </div>
        </div>

        <div className={`${classes.generalDataSection} ${flex.column}`}>
          <div className={genericClasses.subtitle}>
            Комментарии
          </div>
          <TextareaAutosize
            className={classes.commentsTextArea}
            minRows={17}
            maxRows={17}
            name='comments'
            value={item?.comments ?? ''}
            onChange={handleInputChange}
            placeholder="Комментарии менеджера про клиента"
          />
        </div>

        <div className={`${flex.flexStart}  ${flex.fullWidth}`}>
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
      </div>
    </Panel>
  );
}