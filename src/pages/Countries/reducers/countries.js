const initialState = {
    isLoading: false,
    isError: false,
    list: [],
    name: "This is countries from Back-End",
}
// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case 'ERROR_RECEIVE_COUNTRIES': {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        case 'REQUEST_COUNTRIES': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'RECEIVE_COUNTRIES': {
            const {
                countries,
            } = action;
            return {
                ...state,
                isLoading: false,
                list: countries,
                isError: false,
            };
        }
        default:
            return state;
    }
}