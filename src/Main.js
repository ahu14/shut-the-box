import React, {useState, useEffect, 
    createContext, useContext, useRef} from "react";
import { currentPage, changePage, getPage } from "./Page";

import { getCookie, setCookie } from "./Cookie";
import WinTheGame from "./WinTheGame";
import HomePage from "./HomePage";
import Settings from "./Settings";
import GameOver from "./GameOver";
import Game from "./Game";


let data = {
    automatic : false,
    darkMode : false,
    background : '#fefefe',
    color : '#333',
    setBackground : function(){
        return this.darkMode ? '#333' : '#fefefe'
    },
    setColor : function(){
        return this.darkMode ? '#fefefe' : '#333'
    }
}

let settingContext = createContext(data);



let Main = () => {
    let settings = useContext(settingContext);
    let [setting, setSetting] = useState(settings);
    let [page, setPage] = useState(currentPage);
    let [template, setTemplate] = useState();
    let body = useRef();

    useEffect(() => {
        switch (page) {
            case 'shut-the-box':
                setTemplate(<Game page={page} setPage={setPage} 
                setting={setting} setSetting={setSetting} />);
                break;
            
            case 'gameover':
                setTemplate(<GameOver page={page} setPage={setPage} />);
                break;
            
            case 'winthegame':
                setTemplate(<WinTheGame page={page} setPage={setPage} />);
                break;
            
            case 'settings':
                setTemplate(<Settings page={page} setPage={setPage} 
                setting={setting} setSetting={setSetting} />);
                break;
        
            case 'homepage':
                setTemplate(<HomePage page={page} setPage={setPage} />);
                break;
        }
    }, [page]);

    useEffect(() => {        
        body.current.style.background = setting.background;
        body.current.style.color = setting.color;
    }, [setting]);

    useEffect(() => {
        if (getCookie('darkMode') == ''){
            setCookie('darkMode', false);
        }

        if (getCookie('automatic') == ''){
            setCookie('automatic', false);            
        }        

        setSetting(s => {
            s.automatic = JSON.parse(getCookie('automatic'));
            s.darkMode = JSON.parse(getCookie('darkMode'));
            s.background = s.setBackground();
            s.color = s.setColor();

            return {
                automatic : s.automatic,
                darkMode : s.darkMode,
                background : s.background,
                color : s.color,
                setBackground : function(){
                    return this.darkMode ? '#333' : '#fefefe'
                },
                setColor : function(){
                    return this.darkMode ? '#fefefe' : '#333'
                }
            }
        })
    }, []);

    return (
        <settingContext.Provider value={setting}>
            <div className="w-full h-screen flex content-center 
            justify-center flex-col flex-wrap" ref={body}>
                {template}
            </div>
        </settingContext.Provider>
    )
}

export default Main;