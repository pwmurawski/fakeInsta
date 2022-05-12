import React from "react";
import { IState, Action } from "../reducers/reducer";

interface IReducerContext {
  state: IState;
  dispatch: React.Dispatch<Action>;
}

const ReducerContext = React.createContext<IReducerContext | null>(null);

export default ReducerContext;
