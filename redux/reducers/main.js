import * as t from "../Types";

const main = (
  state = {
    name: "guest",
  },
  action
) => {
  switch (action.type) {
    case t.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case t.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      }
    default:
      return { ...state };
  }
};

export default main;
