import {setCookie, getCookie} from "./Cookie.js";

let initialState = {
    automatic : 'false',
    darkMode : 'false',
    themeBackground : '#fefefe',
    themeColor : '#333',
    woodColor: '#854d0e',
    boardColor: '#d97706'
}


let settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'checkData':
            for (let i in state){
                let data = getCookie(i);

                if (data != state[i] && data != ''){
                    setCookie(i, data);
                    state[i] = data;
                }
                
                else{
                    setCookie(i, state[i]);
                    i = state[i];
                }

            }

            return state;


        case 'setTheme':
            state.themeBackground = state.darkMode === 'false' ? '#fefefe' :'#333';
            state.themeColor = state.darkMode === 'false' ? '#333' : '#fefefe';

            return {
                ...state, 
                themeBackground: state.themeBackground,
                themeColor: state.themeColor
            }


        case 'toggleFunction':
            let status = state[action.payload] == 'false' ? 'true' : 'false';
            state[action.payload] = status;
            setCookie(action.payload, status);
            return state;
    
            
        default:
            return state;
    }
}

export default settingReducer;