import { Route } from "../../core/models/interfaces/route";
import { makeStyles } from '@material-ui/core/styles';
import { NavigationLink } from "../../UI/NavigatorLink/NavigationLink";
import { useFlexClasses } from "../../UI/styles/flex-classes";

const useStyles = makeStyles(() => ({
  container: {
    height: '36px',
    gap: '10px'
  }
}))

interface Props {
  baseUrl: string;
}
export function CustomerRoutesNavigator({ baseUrl }: Props) {
  const classes = useStyles();
  const genericClasses = useFlexClasses();
  const routes: Route[] = [
    {
      displayName: 'Общие данные',
      url: `${baseUrl}/generic-information`
    },
    {
      displayName: 'Прайс-листы сайта',
      url: `${baseUrl}/price-lists`
    },
    {
      displayName: 'Прайс-листы файлом',
      url: `${baseUrl}/profiles`
    },
    {
      displayName: 'Заказы из файла',
      url: `${baseUrl}/order-files`
    }
  ];

  return (
    <div
      className={`${classes.container} ${genericClasses.flexWrap}`}
    >
      {routes.map(route => <NavigationLink
        key={route.url}
        route={route}
        selectionIndicatorHeight={'3px'}
        fontSize={'12px'}
        fontWeight={400}
      />)}
    </div>
  );

}