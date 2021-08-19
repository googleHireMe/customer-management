import { makeStyles } from '@material-ui/core/styles';
import { matchPath, useLocation, useHistory } from 'react-router-dom';
import { Route } from '../../core/models/interfaces/route';
import { useFlexClasses } from '../styles/flex-classes';
import { HeightProperty, FontSizeProperty, FontWeightProperty } from 'csstype';
import { CSSProperties } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    cursor: 'pointer',
    boxSizing: 'border-box',
  }
}));

interface Props {
  route: Route;
  selectionIndicatorHeight: HeightProperty<string>;
  fontSize: FontSizeProperty<string>,
  fontWeight: FontWeightProperty
}
export function NavigationLink({ route, selectionIndicatorHeight, fontSize, fontWeight }: Props) {
  const classes = useStyles();
  const genericClasses = useFlexClasses();
  const history = useHistory();
  const location = useLocation();
  const isRouteActive = !!matchPath(location.pathname, route.url);

  let container: CSSProperties = {

  };
  const active: CSSProperties = {
    boxSizing: 'border-box',
    borderTop: `${selectionIndicatorHeight} solid transparent`,
    borderBottom: `${selectionIndicatorHeight} solid #43B02A`,
  };
  if (isRouteActive) { container = { ...container, ...active } }

  const text: CSSProperties = {
    fontSize: fontSize,
    fontWeight: fontWeight
  };

  return (
    <div
      className={`${genericClasses.centeredVertically} ${classes.container}`}
      style={container}
      onClick={() => { history.push(route.url) }}>
      <div style={text}>
        {route.displayName}
      </div>
    </div>
  );
}
