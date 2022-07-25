import * as t from "../Types";

export const loadSettings = () => async (dispatch) => {
  dispatch({
    type: t.LOAD_SETTINGS,
  });
};

export const editSettings = (value) => async (dispatch) => {
  dispatch({
    type: t.EDIT_SETTINGS,
    payLoad: value,
  });
};

export const setCurrentverse = (value) => async (dispatch) => {
  console.log("inside action ",value)
  dispatch({ 
    type : t.SET_CURRENT_VERSE,
    payLoad: value
  })
}