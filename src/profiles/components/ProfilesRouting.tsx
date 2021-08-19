import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { ProfileDetailes } from "../containers/ProfileDetails";
import { ProfilesList } from "../containers/ProfilesList";

// This shid just doesn't work for now...
export function ProfilesRouting() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/create`} component={ProfileDetailes}></Route>
      <Route path={`${path}/:profileId`} component={ProfileDetailes}></Route>
      <Route path={`${path}`} component={ProfilesList}></Route>
    </Switch>
  );
}