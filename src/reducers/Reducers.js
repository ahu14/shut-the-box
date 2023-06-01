import {setCookie, getCookie} from "./Cookie.js";

let initialState = {
    automatic : false,
    darkMode : false,
    background : '#fefefe',
    color : '#333'
}


let settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'checkData':
            let auto = getCookie('automatic');
            let darkMode = getCookie('darkMode');

            if (auto === '' || darkMode === ''){
                setCookie('automatic', false);
                setCookie('darkMode', false);

                state.automatic = false;
                state.darkMode = false;
            }

            else{
                state.automatic = auto;
                state.darkMode = darkMode;
            }

            return {...state, automatic: state.automatic, darkMode: state.darkMode}

        case 'toggleAuto':
            state.automatic = state.automatic === 'false' ? 'true' : 'false';
            setCookie('automatic', state.automatic);
            return {...state, automatic: state.automatic}

        case 'toggleTheme':
            state.darkMode = state.darkMode === 'false' ? 'true' : 'false';
            state.background = state.darkMode === 'false' ? '#fefefe' :'#333';
            state.color = state.darkMode === 'false' ? '#333' : '#fefefe';

            setCookie('darkMode', state.darkMode);
            return {
                ...state, 
                darkMode: state.darkMode,
                background: state.background,
                color: state.color
            }

        case 'setTheme':
            state.background = state.darkMode === 'false' ? '#fefefe' :'#333';
            state.color = state.darkMode === 'false' ? '#333' : '#fefefe';

            return {
                ...state, 
                background: state.background,
                color: state.color
            }
    
        default:
            return state;
    }
}

export default settingReducer;