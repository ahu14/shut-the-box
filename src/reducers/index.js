import settingReducer from "./Reducers";
import { createStore } from "redux";

let store = createStore(settingReducer);
export default store;