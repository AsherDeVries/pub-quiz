import * as REQUEST_STATE from '../../constants/request';

export default {
  isLoggedIn: false,
  loginState: {
    requestStatus: REQUEST_STATE.IDLE,
    message: ""
  }
};
