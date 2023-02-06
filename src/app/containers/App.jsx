import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import IntlProvider from 'components/IntlProvider';
import Header from 'components/Header';
import PageInitial from 'pageProviders/Initial';
import PageLogin from 'pageProviders/Login';
import * as PAGES from 'constants/pages';
import {
  fetchUser,
} from '../actions/user';
import Countries from "../../pages/Countries";
import AddEditCountry from "../../components/AddEditCountry/AddEditCountry";

const App = () => {
  const [state, setState] = useState({
    componentDidMount: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    setState(prevState => ({
      ...prevState,
      componentDidMount: true,
    }));
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <IntlProvider>
        <Header />

        {state.componentDidMount && (
            <Switch>
              <Route path={`/${PAGES.LOGIN}`}>
                <PageLogin />
              </Route>
              <Route path={`/${PAGES.INITIAL}`}>
                <PageInitial />
              </Route>
              <Route exact path={`/countries`}>
                <Countries />
              </Route>
              <Route exact path={`/addEditCountry`}>
                <AddEditCountry />
              </Route>
              <Route path={`/addEditCountry/:id`}>
                <AddEditCountry />
              </Route>

              <Redirect from="*" to={`/${PAGES.INITIAL}`} />

            </Switch>
        )}


      </IntlProvider>
    </BrowserRouter>
  );
};

export default App;
