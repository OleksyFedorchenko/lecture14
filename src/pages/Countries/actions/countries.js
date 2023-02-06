const receiveCountries = countries => ({
    countries,
    type: 'RECEIVE_COUNTRIES'
});

const requestCountries = () => ({
    type: 'REQUEST_COUNTRIES'
});

const errorReceiveCountries = () => ({
    type: 'ERROR_RECEIVE_COUNTRIES'
})

const getCountries = () => {
    const url = "http://localhost:8080/country";
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    };
    return fetch(url, options);
}

const fetchCountries = () => (dispatch) => {
    dispatch(requestCountries());
    return getCountries()
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(countries => dispatch(receiveCountries(countries)))
                    .catch(() => dispatch(errorReceiveCountries()));
            } else {
                console.log('Error with status' + response.status)
            }
        })

};
// eslint-disable-next-line
export default {
    fetchCountries,
};