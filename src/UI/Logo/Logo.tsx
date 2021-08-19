import { makeStyles } from '@material-ui/core/styles';
import { useFlexClasses } from '../styles/flex-classes';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '10px',
    fontWeight: 400,
    color: '#6C757C'
  },
  icon: {
    width: '102px',
    height: '30px',
  }
}));

interface Props {
  className: string
}
export function Logo({className: inputClassName}: Props) {
  const classes = useStyles();
  const genericClasses = useFlexClasses();
  const iconSrc = '/sigma-icon.png';
    
  return (
    <div className={`${genericClasses.centeredVertically} ${inputClassName}`}>
      <img className={classes.icon} src={iconSrc} />
      <div className={classes.text}>Система управления</div>
    </div>
  );
}
