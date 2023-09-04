import { SET_NOTIFICATION } from "redux/constants";
import { Notification } from "redux/types";

export const setNotification = (notification: Notification | null) => ({
  type: SET_NOTIFICATION,
  payload: notification,
});
