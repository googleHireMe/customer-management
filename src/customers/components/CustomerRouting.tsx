import { Route, Switch, useRouteMatch } from "react-router-dom";
import { NotFound } from "../../UI/NotFound/NotFound";
import { CustomerDetails } from "../containers/CustomerDetails";
import { CustomersList } from "../containers/CustomersList";

export function CustomerRouting() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/create`} component={NotFound}></Route>
      <Route path={`${path}/:customerId`} component={CustomerDetails}></Route>
      <Route path={`${path}`} component={CustomersList}></Route>
    </Switch>
  );
}