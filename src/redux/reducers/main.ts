import { SET_NOTIFICATION } from "redux/constants";

const main = (
  state = {},
  action: {
    type: typeof SET_NOTIFICATION;
    payload: Notification;
  },
) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default main;
