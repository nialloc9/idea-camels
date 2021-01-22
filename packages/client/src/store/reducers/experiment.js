import {EXPERIMENT_SET} from '../constants/experiment';
import {STORE_RESET} from '../constants/store';

const initialState = {
    data: [],
    isFetchLoading: false,
    isCreateLoading: false,
    createErrorMessage: '',
    fetchErrorMessage: ''
};

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const experiment = (state = initialState, { type, payload }) => {

    const map = {
        [EXPERIMENT_SET]: () => ({ ...state, ...payload }),
        [STORE_RESET]: () => initialState
    }

    return map[type] ? map[type]() : state;
};

export default experiment;
