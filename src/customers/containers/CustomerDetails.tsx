import { makeStyles } from '@material-ui/core';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { GenericInformation } from './sections/GenericInformation';
import { useFlexClasses } from '../../UI/styles/flex-classes';
import { CustomerRoutesNavigator } from '../components/CustomerRoutesNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { useGenericClasses } from '../../UI/styles/generic-classes';
import { PriceListsMarkups } from './sections/PriceListsMarkups';
import { NotFound } from '../../UI/NotFound/NotFound';
import { ProfileDetailes } from '../../profiles/containers/ProfileDetails';
import { ProfilesList } from '../../profiles/containers/ProfilesList';
import { useEffect } from 'react';
import { loadCustomer } from '../state/customer/customerThunks';
import { CustomerProfileEditScreen } from '../../customer-profiles/containers/lagacy/edit/CustomerProfileEditScreen/CustomerProfileEditScreen';
import { CreateProfile } from '../../profiles/containers/CreateProfile';

const useStyles = makeStyles((theme) => ({
  container: {
    rowGap: '24px'
  },
  header: {
    marginLeft: '40px'
  },
  body: {}
}));

export function CustomerDetails() {
  const classes = useStyles();
  const flex = useFlexClasses();
  const genericClasses = useGenericClasses();

  const { customerId: id } = useParams<{ customerId: string }>();
  const { path, url } = useRouteMatch();

  const dispatch = useDispatch();
  const title = useSelector<RootState, string>(state => state.customer.customerGeneralData?.title);


  useEffect(() => {
    if (id) { dispatch(loadCustomer(id)); }
  }, [id]);

  return (
    <div className={`${flex.column} ${classes.container}`}>
      <div className={classes.header}>
        <div className={genericClasses.subtitleXl}>
          {title}
        </div>
        <CustomerRoutesNavigator baseUrl={url} />
      </div>
      <div className={classes.body}>
        <Switch>
          <Route exact path={`${path}/generic-information`} component={GenericInformation}></Route>
          <Route exact path={`${path}/price-lists`} component={PriceListsMarkups}></Route>
          {/* <Route exact path={`${path}/profiles`} component={ProfilesRouting}></Route> */}
          <Route path={`${path}/profiles/create`} component={CreateProfile}></Route>
          <Route path={`${path}/profiles/:profileId`} component={ProfileDetailes}></Route>
          <Route path={`${path}/profiles`} component={ProfilesList}></Route>
          <Route exact path={`${path}/order-files`} component={NotFound}></Route>
          <Redirect exact from={`${path}`} to={`${path}/generic-information`} />
        </Switch>
      </div>
    </div>
  );

}
