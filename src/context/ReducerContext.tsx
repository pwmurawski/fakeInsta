import React from "react";
import { IReducerContext } from "../interfaces/interfaces";

const ReducerContext = React.createContext<IReducerContext | null>(null);

export default ReducerContext;
