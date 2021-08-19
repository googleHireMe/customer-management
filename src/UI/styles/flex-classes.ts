import { makeStyles } from '@material-ui/core/styles';

export const useFlexClasses = makeStyles((theme) => ({
  centeredVertically: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  flexStart: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  fullWidth: {
    width: '50%'
  },
  halfOfWidth: {
    width: '50%'
  },
}));