import React, { useState, useEffect } from "react";
import { currentPage } from "./Page";
import {useSelector, useDispatch} from "react-redux";

import WinTheGame from "./WinTheGame";
import HomePage from "./HomePage";
import Settings from "./Settings";
import GameOver from "./GameOver";
import Game from "./Game";



let Main = () => {
    let [page, setPage] = useState(currentPage);
    let [prev, setPrev] = useState();
    let [template, setTemplate] = useState();
    
    let data = useSelector(state => state);
    let dispatch = useDispatch();

    useEffect(() => {
        setPrev(prev2 => prev2 = page);

        switch (page) {
            case 'shut-the-box':
                setTemplate(<Game page={page} setPage={setPage} />);
                break;
            
            case 'gameover':
                setTemplate(<GameOver page={page} setPage={setPage} />);
                break;
            
            case 'winthegame':
                setTemplate(<WinTheGame page={page} setPage={setPage} />);
                break;
            
            case 'settings':
                setTemplate(<Settings page={page} setPage={setPage} />);
                break;
        
            case 'homepage':
                setTemplate(<HomePage page={page} setPage={setPage} />);
                break;
        }
    }, [page]);


    useEffect(() => {
        dispatch({type: 'checkData'});
        dispatch({type: 'setTheme'});
    }, []);


    if (page == 'settings'){
        return(
            <div style={{background: data.themeBackground, color: data.themeColor}}>
                <div className="w-full h-full flex 
                content-center justify-center flex-col flex-wrap">
                    {template}
                </div>
            </div>
        )
    }

    else{
        return (
            <div style={{background: data.themeBackground, color: data.themeColor}}>
                <div className="w-full h-screen flex 
                content-center justify-center flex-col flex-wrap">
                    {template}
                </div>
            </div>
        )
    }
}

export default Main;