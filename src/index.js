import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store from "./reducers/index";
import Main from "./Main.js";
import "./index.css";

let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Main />
    </Provider>
);