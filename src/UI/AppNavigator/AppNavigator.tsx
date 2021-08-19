import { makeStyles } from "@material-ui/core";
import { Route } from "../../core/models/interfaces/route";
import { NavigationLink } from "../NavigatorLink/NavigationLink";
import { useFlexClasses } from "../styles/flex-classes";

const useStyles = makeStyles(() => ({
  container: {
    gap:'12px',
    height: '100%'
  }
}));

export function AppNavigator() {
  const classes = useStyles();
  const genericClasses = useFlexClasses();
  const routes: Route[] = [
    {
      displayName: 'Заказы',
      url: '/orders'
    },
    {
      displayName: 'Клиенты',
      url: '/customers'
    },
    {
      displayName: 'Поставщики',
      url: '/suppliers'
    },
  ];

  return (
    <div className={`${genericClasses.flexStart} ${classes.container}`}>
      {routes.map(route => <NavigationLink
                key={route.url}
                route={route}
                selectionIndicatorHeight={'5px'}
                fontSize={'14px'}
                fontWeight={700}
      />)}
    </div>
  )
}