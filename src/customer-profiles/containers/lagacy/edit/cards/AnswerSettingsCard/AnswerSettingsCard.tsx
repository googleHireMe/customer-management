import React, { useEffect } from "react"
import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, TextField } from "@material-ui/core"
import { Controller, useForm } from "react-hook-form"
import ChipInput from 'material-ui-chip-input'
import { AnswerSettings } from "../../../../../interfaces/answer-settings";
import { commonCustomerProfileStyles, commonInputProps } from "../../../../../consts/consts";
import { useDispatch, useSelector } from "react-redux"
import { loadAnswerSettings, updateAnswerSettings } from "../../../../../state/answerSettings/answerSettingsThunks"
import { setAnswerSettings } from "../../../../../state/answerSettings/answerSettingsSlice"
import { RootState } from "../../../../../../store/rootReducer"
import { Row, Col } from "react-bootstrap";



interface Props {
  profileId: string
}
function AnswerSettingsCard({ profileId }: Props) {
  const classes = commonCustomerProfileStyles();

  const { register, reset, control, handleSubmit } = useForm<AnswerSettings>();

  const answerSettings = useSelector<RootState, AnswerSettings>(state => state.answerSettings);

  useEffect(() => {
    if (answerSettings) { reset(answerSettings); }
  }, [answerSettings, reset]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profileId) { dispatch(loadAnswerSettings(profileId)); }
  }, [profileId, dispatch]);

  useEffect(() => () => {
    dispatch(setAnswerSettings(null))
  }, [dispatch]);

  const onSubmit = (formValue: AnswerSettings) => {
    console.log(formValue);
    dispatch(updateAnswerSettings(profileId, formValue));
  };

  return (
    <Card className={classes.cardMargin} >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <CardHeader title="Настройки ответа" />
        <CardContent>
        <Row>
        <Col xs={4} className={classes.verticalFormFieldMargin}>
          <Controller
            render={({ value, onChange }) =>
              <ChipInput style={{marginBottom: 25}}
                {...commonInputProps}
                value={value}
                onChange={onChange}
                label="Почта для заказов"
                alwaysShowPlaceholder={false}
                helperText="Нажмите enter"
              />
            }
            name="emailForAnswer"
            defaultValue={[]}
            control={control}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className={classes.verticalFormFieldMargin}>
          <TextField
            {...commonInputProps}
            name="customerName"
            label="Имя клиента"
            placeholder="Александр Белов"
            inputRef={register}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} className={classes.verticalFormFieldMargin}>
          <FormGroup row>
            <FormControlLabel style={{ marginTop: 10, marginRight: 0 }}
              label="Сохранять тему письма"
              control={
                <Controller
                  name="preserveSubject"
                  defaultValue={false}
                  control={control}
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

export default AnswerSettingsCard;