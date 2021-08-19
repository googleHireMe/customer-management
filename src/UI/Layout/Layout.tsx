import { isLoadingSelector } from '../BackdropLoader/loaderSlice';
import BackdropLoader from '../BackdropLoader/BackdropLoader';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Header } from '../Header/Header';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  body: {
    margin: '40px 24px'
  }
}));

interface Props {
  children: JSX.Element | JSX.Element[];
}
export function Layout({ children }: Props) {
  
  const classes = useStyles();
  const isLoading = useSelector<RootState, boolean>(state => isLoadingSelector(state));

  return (
    <>
      <Header/>
      <div className={classes.body}>
        {isLoading ? (<BackdropLoader />) : undefined}
        {children}
      </div>
    </>
  );
}
