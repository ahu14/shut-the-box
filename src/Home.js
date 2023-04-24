import React, {useState, useEffect, 
    createContext, useContext, useRef} from "react";
import { currentPage, changePage, getPage } from "./Page";
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



let Home = () => {
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
        
            default :
                setTemplate(<HomePage page={page} setPage={setPage} />);
                break;
        }
    }, [page]);

    useEffect(() => {
        body.current.style.background = setting.background;
        body.current.style.color = setting.color;
    }, [setting]);

    return (
        <settingContext.Provider value={setting}>
            <div className="w-full h-screen flex content-center 
            justify-center flex-col flex-wrap" ref={body}>
                {template}
            </div>
        </settingContext.Provider>
    )
}


let Settings = ({page, setPage, setting, setSetting}) => {
    let [auto, setAuto] = useState(setting.automatic);
    let [dark, setDark] = useState(setting.darkMode);

    let clicked = () => {
        changePage('homepage');
        setPage(currentPage);
    }

    let setData = (event) => {
        setSetting(s => {
            event.target.id == "btn-1" 
                ? setDark(s.darkMode = dark == false ? true : false)
                : setAuto(s.automatic = auto == false ? true : false)

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
        

        if (event.target.style.justifyContent == ""){
            event.target.style.justifyContent = "flex-end";
        }

        else{
            event.target.style.justifyContent = "";
        }
    }

    return (
        <>
            <button onClick={clicked} id="homepage" className="p-3 m-3 
            border-2 duration-300 border-black-200 rounded 
            hover:border-neutral-950">Back to Home</button>

            <div className="w-48 h-fit flex flex-col">
                <div className="w-inherit h-14 flex items-center justify-between">
                    <p className="text-ms">Dark Mode</p>

                    <div id="btn-1" className="w-14 h-8 bg-slate-200 rounded-full 
                    flex items-center px-1" onClick={setData}>
                        <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                    </div>
                </div>

                <div className="w-inherit h-14 flex items-center justify-between">
                    <p className="text-ms">Automatic Dice</p>

                    <div id="btn-2" className="w-14 h-8 bg-slate-200 rounded-full 
                    flex items-center px-1" onClick={setData}>
                        <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
                    </div>
                </div>
            </div>
        </>
    )
}


let HomePage = ({page, setPage}) => {
    let clicked = (event) => {
        let classId = event.target.id;
        classId == 'play' ? changePage('shut-the-box') : changePage('settings');
        setPage(currentPage);
    }

    return (
        <>
            <h2 className="text-2xl font-bold">Home Page</h2>
            <button onClick={clicked} id="play" className="p-3 m-3 
            border-2 duration-300 border-black-200 rounded 
            hover:border-neutral-950">Let's Play</button>
            <button onClick={clicked} id="settings" className="p-3 m-3 
            border-2 duration-300 border-black-200 rounded 
            hover:border-neutral-950">Settings</button>
        </>
    )
}

let GameOver = ({page, setPage}) => {
    let clicked = () => {
        changePage('shut-the-box');
        setPage(currentPage);
    }

    return (
        <>
            <h2 className="text-center text-xl font-bold">Game Over</h2>
            <p className="my-2 text-l font-medium">Good one ! Try Again !</p>
            <button onClick={clicked} className="p-2.5 m-3 border-2 duration-300
            border-black-200 rounded hover:border-neutral-950">Play Again</button>
        </>
    )
}


let WinTheGame = ({page, setPage}) => {
    let clicked = (event) => {
        let classId = event.target.id;
        classId == 'home-page' ? changePage('homepage') : changePage('shut-the-box');
        setPage(currentPage);
    }

    return (
        <div className="w-48 h-48 text-center">
            <h2 className="text-xl font-bold">You Win !</h2>
            <p className="text-lg mb-3">Good Game Well Played</p>
            <button onClick={clicked} id="home-page" className="p-2.5 m-3 border-2 duration-300
            border-black-200 rounded hover:border-neutral-950">Go to Home Page</button>
            <button onClick={clicked} id="play-again" className="p-2.5 m-3 border-2 duration-300
            border-black-200 rounded hover:border-neutral-950">Play Again</button>
        </div>
    )
}

export default Home;