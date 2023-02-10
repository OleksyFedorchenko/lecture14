import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
    BrowserRouter,
    Switch,
    Redirect,
    Route,
} from 'react-router-dom';
import IntlProvider from 'components/IntlProvider';
import Header from 'components/Header';
import PageInitial from 'pageProviders/Initial';
import PageCountry from 'pageProviders/Countries';
import PageAddEditCountry from 'pageProviders/AddEditCountry';
import PageLogin from 'pageProviders/Login';
import * as PAGES from 'constants/pages';
import {
    fetchUser,
} from '../actions/user';

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
                <Header/>

                {state.componentDidMount && (
                    <Switch>
                        <Route path={`/${PAGES.LOGIN}`}>
                            <PageLogin/>
                        </Route>
                        <Route path={`/${PAGES.INITIAL}`}>
                            <PageInitial/>
                        </Route>
                        <Route exact path={`/${PAGES.COUNTRIES}`}>
                            <PageCountry/>
                        </Route>
                        <Route exact path={`/${PAGES.ADD_EDIT_COUNTRY}`}>
                            <PageAddEditCountry/>
                        </Route>
                        <Route path={`/${PAGES.ADD_EDIT_COUNTRY}/:id`}>
                            <PageAddEditCountry/>
                        </Route>

                        <Redirect from="*" to={`/${PAGES.INITIAL}`}/>

                    </Switch>
                )}


            </IntlProvider>
        </BrowserRouter>
    );
};

export default App;
