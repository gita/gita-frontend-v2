import * as t from "../Types";

const intialState = {
  loading: false,
  fontSize: "14",
  fontFamily: "proxima",
  spacing: "2",
  bg: "white",
};

const settings = (prevState = intialState, action) => {
  switch (action.type) {
    case t.LOAD_SETTINGS:
      return {
        ...prevState,
        loading: true,
      };
    case t.EDIT_SETTINGS:
      return {
        ...prevState,
        fontsize: action.payload.fontsize,
        fontFamily: action.payload.fontFamily,
      };
    default: {
      return { ...prevState };
    }
  }
};

export default settings;
