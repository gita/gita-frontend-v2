import { useMemo } from "react";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  thunk as thunkMiddleware,
  ThunkDispatch,
  ThunkMiddleware,
} from "redux-thunk";

import {
  AnyAction,
  applyMiddleware,
  createStore,
  Middleware,
  Store,
  UnknownAction,
} from "redux";

import reducers, {
  RootState as RootReducerState,
} from "./reducers/rootReducer";
import { MainState, RootState, SettingsState } from "./types";

export type AppDispatch = ThunkDispatch<
  RootReducerState,
  undefined,
  UnknownAction
>;
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector = useReduxSelector.withTypes<RootReducerState>();

let store:
  | Store<{
      main: MainState;
      settings: SettingsState;
    }>
  | undefined = undefined;

function initStore(initialState?: Partial<RootReducerState>) {
  return createStore(
    reducers,
    initialState as any,
    composeWithDevTools(applyMiddleware(thunkMiddleware as Middleware)),
  );
}

export const initializeStore = (preloadedState?: Partial<RootReducerState>) => {
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

export function useStore(initialState?: Partial<RootReducerState>) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
