import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import CountryPage from 'pages/Countries';

const Countries = () => (
    <PageAccessValidator>
        <CountryPage/>
    </PageAccessValidator>
);

export default Countries;