import { useEffect } from "react"
import { TextField, Button, Card, CardActions, CardContent, CardHeader } from "@material-ui/core"
import { useForm } from "react-hook-form"
import { commonCustomerProfileStyles, commonInputProps } from "../../../../../consts/consts";
import { Customer } from "../../../../../interfaces/customer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../store/rootReducer";
import { CustomerProfileMainSettings } from "../../../../../interfaces/main-customer-profile";
import { createCustomerProfile, loadCustomerProfile } from "../../../../../state/customerProfile/customerProfileThunks";
import { setProfile } from "../../../../../state/customerProfile/customerProfileSlice";
import { loadCustomers } from "../../../../../state/customerProfilesList/customerProfilesListThunks";
import { Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

interface Props {
  profileId: string
}
function CustomerProfileSettingsCard({ profileId }: Props) {
  const classes = commonCustomerProfileStyles();

  const { customerId } = useParams<{ customerId: string }>();
  const history = useHistory();

  const { register, reset, control, handleSubmit } = useForm<CustomerProfileMainSettings>();

  const customerProfileMainSettings = useSelector<RootState, CustomerProfileMainSettings>(state => state.customerProfile.profile);
  const customers = useSelector<RootState, Customer[]>(state => state.customerProfile.customers);

  useEffect(() => {
    if (customerProfileMainSettings) { reset(customerProfileMainSettings); }
  }, [customerProfileMainSettings, reset]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profileId) { dispatch(loadCustomerProfile(profileId)); }
  }, [profileId, dispatch]);

  useEffect(() => () => {
    dispatch(setProfile(null))
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCustomers());
  }, [dispatch]);

  const onSubmit = (formValue: CustomerProfileMainSettings) => {
    console.log(formValue);
    formValue.customerId = +customerId;
    if (!profileId) { formValue.id = undefined; }
    dispatch(createCustomerProfile(formValue));
    history.goBack();
  };

  return (
    <Card className={classes.cardMargin} >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <CardHeader title="Настройки клиентского профиля" />
        <CardContent>
          {/* <Row>
            <Col xs={4} className={classes.verticalFormFieldMargin}>
              <TextField
                {...commonInputProps}
                name="id"
                label="Id клиентского профиля"
                inputRef={register}
              />
            </Col>
          </Row> */}
          {/* <Row>
            <Col xs={4}>
              <FormControl fullWidth={true}>
                <InputLabel>
                  Id клиента
                </InputLabel>
                <Controller
                  name="customerId"
                  control={control}
                  defaultValue=""
                  as={
                    <Select>
                      {customers?.map((option) => (
                        <MenuItem key={option.customerId} value={option.customerId}>
                          {option.customerTitle}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                />
              </FormControl>
            </Col>
          </Row> */}
          {/* <Row>
            <Col xs={4}>
              <TextField
                {...commonInputProps}
                name="customerId"
                label="Id клиента"
                inputRef={register}
              />
            </Col>
          </Row> */}
          <Row>
            <Col xs={4} className={classes.verticalFormFieldMargin}>
              <TextField
                {...commonInputProps}
                name="title"
                label="Название"
                placeholder="Имя профиля"
                inputRef={register}
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

export default CustomerProfileSettingsCard;