import './App.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store from './store/store';
import { history } from './store/rootReducer';
import { theme } from './materialTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Redirect, Route, Switch } from 'react-router';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './UI/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { Layout } from './UI/Layout/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CustomerRouting } from './customers/components/CustomerRouting';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConnectedRouter history={history}>
          <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            preventDuplicate={false}
            maxSnack={10}
          >
            <SnackbarUtilsConfigurator />
            <Layout>
              <Switch>
                <Route path="/customers" component={CustomerRouting}></Route>
                <Redirect exact from="/" to="customers"/>
              </Switch>
            </Layout>
          </SnackbarProvider>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;