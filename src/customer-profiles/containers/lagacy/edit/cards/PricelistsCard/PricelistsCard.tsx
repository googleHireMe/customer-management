import React, { useEffect } from "react";
import { Button, Card, CardActions, CardContent, CardHeader } from "@material-ui/core";

import { useForm } from "react-hook-form";
import PricelistsTable from '../../../../../components/tables/PricelistsTable/PricelistsTable';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../../store/rootReducer";
import { Pricelist } from "../../../../../interfaces/pricelist";
import { loadPricelists, updatePricelists } from "../../../../../state/pricelists/pricelistsThunks";
import { addPricelist, setAllPricelists } from "../../../../../state/pricelists/pricelistsSlice";
import { commonCustomerProfileStyles } from "../../../../../consts/consts";
import randomInt from 'random-int';
import { maxInt } from "../../../../../../core/consts/consts";
import { Row, Col } from "react-bootstrap";

interface Props {
  profileId: string
}
function PricelistsCard({ profileId }: Props) {
  const classes = commonCustomerProfileStyles();
  const dispatch = useDispatch();
  const { register, setValue, control, handleSubmit } = useForm<Pricelist[]>();
  const pricelists = useSelector<RootState, Pricelist[]>(state => state.pricelists.pricelists);

  useEffect(() => {
    if (profileId) { dispatch(loadPricelists(profileId)); }
  }, [profileId, dispatch]);

  useEffect(() => () => {
    dispatch(setAllPricelists([]))
  }, [dispatch]);

  const createPricelist = (): void => {
    const createdPricelist: Pricelist = {
      pricelistId: randomInt(maxInt),
      name: '',
      supplierName: '',
      logo: '',
      updated: '',
      deliveryTerms: 0,
      rowCount: 0,
      isIncluded: false,
      margin: 0
    }
    console.log('going to dispatch', createdPricelist);
    dispatch(addPricelist(createdPricelist));
  }

  const formatCreatedPricelistsIdsBeforeSending = (pricelists: Pricelist[] | null) =>
    pricelists?.map(pricelist => {
      // if (pricelist.pricelistId < 0) { pricelist.pricelistId = 0; }
      return pricelist;
    });

  const onSubmit = (formValue: { pricelists: Pricelist[] }) => {
    const editedPricelists = formValue.pricelists;
    console.log(editedPricelists);
    dispatch(updatePricelists(profileId, formatCreatedPricelistsIdsBeforeSending(editedPricelists)));
  };

  return (
    <Card className={classes.cardMargin} >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <CardHeader title="Прайслисты" />
        <CardContent>
          <Row>
            <Col xs={12}>
              <PricelistsTable
                  pricelists={pricelists}
                  createPricelist={createPricelist}
                  control={control}
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

export default PricelistsCard;