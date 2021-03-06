import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';

import './custom.css'
import PrivacyPolicy from './components/PrivacyPolicy';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/privacy-policy' component={PrivacyPolicy} />
    </Layout>
);
