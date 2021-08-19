import { makeStyles } from '@material-ui/core/styles';
import { Route } from '../../core/models/interfaces/route';
import { AppNavigator } from '../AppNavigator/AppNavigator';
import { Logo } from '../Logo/Logo';
import { useFlexClasses } from '../styles/flex-classes';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#FFFFFF',
    height: '60px'
  },
  logo: {
    marginRight: '42px',
    marginLeft: '23px'
  }
}));


export function Header() {
  const classes = useStyles();
  const flex = useFlexClasses();

  return (
    <>
      <div className={`${classes.container} ${flex.flexWrap}`}>
        <Logo className={classes.logo} />
        <AppNavigator />
      </div>
    </>
  );
}
