import { Dispatch } from "redux";
import { EDIT_SETTINGS } from "redux/constants";
import { SettingsState } from "redux/types";

export const editSettings =
  (value: SettingsState) => async (dispatch: Dispatch) => {
    dispatch({
      type: EDIT_SETTINGS,
      payLoad: value,
    });
  };
