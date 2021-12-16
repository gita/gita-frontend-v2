import * as t from "../Types";

export const loadSettings = () => async (dispatch) => {
  dispatch({
    type: "t.LOAD_SETTINGS",
  });
};
