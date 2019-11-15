import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { StoreProvider } from './Store'
import { Router, RouteComponentProps } from '@reach/router'
import HomePage from './HomePage'
import FavPage from './FavPage'


const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent
ReactDOM.render(
    <>
        <App />
        <StoreProvider>
            <Router>
                <RouterPage pageComponent={<HomePage />} path='/' />
                <RouterPage pageComponent={<FavPage />} path='/favs' />
            </Router>
        </StoreProvider>
    </>, document.getElementById('root'));


