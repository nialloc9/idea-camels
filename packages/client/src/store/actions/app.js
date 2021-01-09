import {APP_SET} from '../constants/app';

export const onSetIsLogin = isLoginOpen => ({ type: APP_SET, payload: { isLoginOpen } });