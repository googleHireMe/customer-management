import { makeStyles } from '@material-ui/core/styles';

export const useGenericClasses = makeStyles((theme) => ({
  subtitle: {
    fontSize: '16px',
    fontWeight: 500
  },
  subtitleSm: {
    fontSize: '12px',
    fontWeight: 500
  },
  subtitleXl: {
    fontSize: '24px',
    fontWeight: 700
  }
}));