import React, { useEffect } from "react"
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core"

import { Controller, useForm } from "react-hook-form"
import { commonCustomerProfileStyles, commonInputProps, fileTypesList } from "../../../../../consts/consts";
import { FileType } from "../../../../../interfaces/file-type";
import { ParsingSettings } from "../../../../../interfaces/parsing-settings";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../../store/rootReducer";
import { loadParsingSettings, updateParsingSettings } from "../../../../../state/parsingSettings/parsingSettingsThunks";
import { setParsingSettings } from "../../../../../state/parsingSettings/parsingSettingsSlice";
import { Row, Col } from "react-bootstrap";

interface Props {
  profileId: string
}
function ParsingSettingsCard({ profileId }: Props) {
  const classes = commonCustomerProfileStyles();

  const { register, reset, control, handleSubmit } = useForm<ParsingSettings>();

  const parsingSettings = useSelector<RootState, ParsingSettings>(state => state.parsingSettings);
  const fileTypes: FileType[] = fileTypesList;

  useEffect(() => {
    if (parsingSettings) { reset(parsingSettings); }
  }, [parsingSettings, reset]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profileId) { dispatch(loadParsingSettings(profileId)); }
  }, [profileId, dispatch]);

  useEffect(() => () => {
    dispatch(setParsingSettings(null))
  }, [dispatch]);
  
  const onSubmit = (formValue: ParsingSettings) => {
    console.log(formValue);
    dispatch(updateParsingSettings(profileId, formValue));
  };

  return (
    <Card className={classes.cardMargin} >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <CardHeader title="Настройки парсинга" />
        <CardContent>
          <Row>
            <Col xs={4} className={classes.verticalFormFieldMargin}>
              <TextField
                {...commonInputProps}
                name="email"
                label="Почта для заказов"
                placeholder="Введите email"
                inputRef={register}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4} className={classes.verticalFormFieldMargin}>
              <TextField
                {...commonInputProps}
                name="subject"
                label="Тема письма"
                placeholder='*Заказ ООО "КИРОМПАРТС"'
                inputRef={register}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4} className={classes.verticalFormFieldMargin}>
              <TextField
                {...commonInputProps}
                name="filename"
                label="Наименование файла"
                placeholder="_ProviderOrder_*.xlsx"
                inputRef={register}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4} className={classes.verticalFormFieldMargin}>
              <FormControl fullWidth={true}>
                <InputLabel>
                  Тип файла
                </InputLabel>
                <Controller
                  name="fileType"
                  control={control}
                  defaultValue=""
                  as={
                    <Select>
                      {fileTypes?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                />
              </FormControl>
            </Col>
          </Row>
          <Row className={classes.verticalFormFieldMargin}> 
            <Col>
              <TextField
                {...commonInputProps}
                name="startRow"
                label="Начало файла"
                placeholder="10"
                type="number"
                inputRef={register}
              />
            </Col>
            <Col>
              <TextField
                {...commonInputProps}
                name="articleColumn"
                label="Артикул"
                placeholder="2"
                type="number"
                inputRef={register}
              />
            </Col>
            <Col>
              <TextField
                {...commonInputProps}
                name="brandColumn"
                label="Бренд"
                placeholder="3"
                type="number"
                inputRef={register}
              />
            </Col>
            <Col>
              <TextField
                {...commonInputProps}
                name="nameColumn"
                label="Наименование"
                placeholder="4"
                type="number"
                inputRef={register}
              />
            </Col>
            <Col>
              <TextField
                {...commonInputProps}
                name="quantityColumn"
                label="Количество"
                placeholder="6"
                type="number"
                inputRef={register}
              />
            </Col>
            <Col>
              <TextField
                {...commonInputProps}
                name="priceColumn"
                label="Цена"
                placeholder="7"
                type="number"
                inputRef={register}
              />
            </Col>
            <Col>
              <TextField
                {...commonInputProps}
                name="answerColumn"
                label="Ответ"
                placeholder="6"
                type="number"
                inputRef={register}
              />
            </Col>
            <Col>
              <TextField
                {...commonInputProps}
                name="commentColumn"
                label="Комментарий"
                placeholder="10"
                type="number"
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

export default ParsingSettingsCard;