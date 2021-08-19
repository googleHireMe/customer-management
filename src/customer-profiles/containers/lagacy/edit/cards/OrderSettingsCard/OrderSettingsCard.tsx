import React, { useEffect } from "react"
import { TextField, InputAdornment, FormControlLabel, Checkbox, FormGroup, Button, Card, CardActions, CardContent, CardHeader } from "@material-ui/core"
import { Controller, useForm } from "react-hook-form"
import { commonCustomerProfileStyles, commonInputProps } from "../../../../../consts/consts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../store/rootReducer";
import MarginRulesTable from '../../../../../components/tables/MarginRulesTable/MarginRulesTable';
import ExcludingRulesTable from '../../../../../components/tables/ExcludingRulesTable/ExcludingRulesTable';
import { OrderSettings } from "../../../../../interfaces/order-settings";
import { ExcludingRule } from "../../../../../interfaces/excluding-rule";
import { MarginRule } from "../../../../../interfaces/margin-rule";
import { addExcludingRule, addMarginRule, setOrderSettings } from "../../../../../state/orderSettings/orderSettingsSlice";
import { loadOrderSettings, updateOrderSettings } from "../../../../../state/orderSettings/orderSettingsThunks";
import randomInt from 'random-int';
import { maxInt } from "../../../../../../core/consts/consts";
import { Row, Col } from "react-bootstrap";

interface Props {
  profileId: string
}
function OrderSettingsCard({ profileId }: Props) {
  const classes = commonCustomerProfileStyles();
  const dispatch = useDispatch();
  const { register, setValue, control, handleSubmit } = useForm<OrderSettings>();

  const deliveryTerms = useSelector<RootState, number>(state => state.orderSettings?.deliveryTerms);
  const isExactQuantityOrdering = useSelector<RootState, boolean>(state => state.orderSettings?.isExactQuantityOrdering);
  const excludingRules =  useSelector<RootState, ExcludingRule[]>(state => state.orderSettings?.excludingRules);
  const marginRules =  useSelector<RootState, MarginRule[]>(state => state.orderSettings?.marginRules);

  useEffect(() => {
    if (profileId) { dispatch(loadOrderSettings(profileId)); }
  }, [profileId, dispatch]);

  useEffect(() => {
    if (deliveryTerms) { setValue('deliveryTerms', deliveryTerms); }
  }, [deliveryTerms, setValue]);

  useEffect(() => {
    if (isExactQuantityOrdering) { setValue('isExactQuantityOrdering', isExactQuantityOrdering); }
  }, [isExactQuantityOrdering, setValue]);

  useEffect(() => () => {
    dispatch(setOrderSettings(null))
  }, [dispatch]);
  
  const createExcludingRule = (): void => {
    const createdExcludingRule: ExcludingRule = {
      pricelistId: randomInt(maxInt),
      brand: '',
      article: ''
    }
    dispatch(addExcludingRule(createdExcludingRule));
  }
  const createMarginRule = (): void => {
    const createdMarginRule: MarginRule = {
      pricelistId: randomInt(maxInt),
      brand: '',
      article: '',
      marginPercent: 0,
      rrp: 0
    }
    dispatch(addMarginRule(createdMarginRule));
  }

  const formatCreatedItemIdsBeforeSending = (item: (ExcludingRule | MarginRule)[] | null) =>
    item?.map(pricelist => {
      // if (pricelist.pricelistId < 0) { pricelist.pricelistId = 0; }
      return pricelist;
  });

  const onSubmit = (formValue: OrderSettings) => {
    formValue.excludingRules = formatCreatedItemIdsBeforeSending(formValue.excludingRules);
    formValue.marginRules = formatCreatedItemIdsBeforeSending(formValue.marginRules);
    console.log(formValue);
    dispatch(updateOrderSettings(profileId, formValue));
  };

  return (
    <Card className={classes.cardMargin} >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <CardHeader title="Настройки заказа" />
        <CardContent>
          <Row>
            <Col xs={4} className={classes.verticalFormFieldMargin}>
              <TextField
                {...commonInputProps}
                name="deliveryTerms"
                label="Сроки поставки"
                type="number"
                placeholder="3"
                InputProps={{
                  endAdornment: <InputAdornment position="end">дн.</InputAdornment>
                }}
                inputRef={register}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4} className={classes.verticalFormFieldMargin}>
              <FormGroup row>
                <FormControlLabel style={{ marginTop: 10, marginRight: 0 }}
                  label="Точное совпадение по количеству в заказе"
                  control={
                    <Controller
                      name="isExactQuantityOrdering"
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
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className={classes.cardMargin}>
            <Col xs={12}>
              <ExcludingRulesTable
                  excludingRules={excludingRules}
                  createExcludingRule={createExcludingRule}
                  register={register}
                  setValue={setValue}
                />
            </Col>
          </Row>
          <Row className={classes.cardMargin}>
            <Col xs={12}>
              <MarginRulesTable
                  marginRules={marginRules}
                  createMarginRule={createMarginRule}
                  register={register}
                  setValue={setValue}
                />
            </Col>
          </Row>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <Button
            type="submit"
            size="medium">
            Сохранить
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default OrderSettingsCard;