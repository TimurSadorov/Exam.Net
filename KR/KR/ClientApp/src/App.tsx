import * as React from 'react';
import {Route} from 'react-router-dom';
import {Layout} from './components/Layout';
import './custom.css'
import FormForCredit from "./components/formForCredit/FormForCredit";

export function App() {
    return (
        <Layout>
            <Route path='/pageCredit' component={FormForCredit}/>
        </Layout>
    )
}