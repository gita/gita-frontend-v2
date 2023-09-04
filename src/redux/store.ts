import { useMemo } from "react";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import { applyMiddleware, createStore, Store } from "redux";

import reducers from "./reducers/rootReducer";
import { MainState, RootState } from "./types";

let store:
  | Store<{
      main: MainState;
    }>
  | undefined = undefined;

function initStore(initialState: RootState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

export const initializeStore = (preloadedState: RootState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the apolloClient
  if (!store) store = _store;

  return _store;
};

export function useStore(
  initialState: RootState = {
    main: {},
  },
) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
