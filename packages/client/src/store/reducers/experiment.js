import {EXPERIMENT_SET} from '../constants/experiment';
import {STORE_RESET} from '../constants/store';
import {getCookie, decodecookie} from '../../utils/cookie';

const initialState = {
    data: [],
    templates: [],
    theme: [],
    experiment: {
        name: '',
        expiry: undefined,
        content: {},
        theme: {},
        templateRef: undefined,
        domainRef: undefined
    },
    isFetchLoading: false,
    isFetchInitialised: false,
    isFetchTemplatesLoading: false,
    isCreateLoading: false,
    isFetchTemplatesInitialised: false,
    createErrorMessage: '',
    fetchErrorMessage: '',
    fetchTemplatesErrorMessage: ''
};

const cookie = getCookie('experiment');

const cache = cookie ? decodecookie(cookie) : {};

const persistedState = cache ? {...initialState, ...cache} : initialState;

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const experiment = (state = persistedState, { type, payload }) => {

    const map = {
        [EXPERIMENT_SET]: () => ({ ...state, ...payload }),
        [STORE_RESET]: () => initialState
    }

    return map[type] ? map[type]() : state;
};

export default experiment;
