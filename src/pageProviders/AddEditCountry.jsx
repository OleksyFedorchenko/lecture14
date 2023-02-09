import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import AddEditCountryPage from 'pages/AddEditCountry';

const AddEditCountry = () => (
    <PageAccessValidator>
        <AddEditCountryPage />
    </PageAccessValidator>
);

export default AddEditCountry;