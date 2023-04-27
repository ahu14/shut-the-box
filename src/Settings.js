import {useEffect, useState} from "react";
import { currentPage, changePage } from "./Page";
import { getCookie, setCookie } from "./Cookie";

let Button = ({id, status, setStatus, setting, setSetting}) => {
    let [clicked, setClicked] = useState(status[id]);

    let detectClick = (event) => {
        setClicked(clicked = clicked == true ? false : true);
        setStatus(prev => {
            prev[id] = clicked;
            return prev;
        });

        clicked == true
            ? event.target.style.justifyContent = "flex-end"
            : event.target.style.justifyContent = ""
        
        setSetting(s => {
            s.darkMode = status['dark'];
            s.automatic = status['auto'];
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
    }

    useEffect(() => {
        let btn = document.querySelector(`#btn-${id}`);
        
        status[id] 
            ? btn.style.justifyContent = "flex-end"
            : btn.style.justifyContent = "";
           
        btn.id == 'btn-dark'
            ? setCookie('darkMode', JSON.parse(status['dark']))
            : setCookie('automatic', JSON.parse(status['auto']))
    }, [status, detectClick]);

    return (
        <div id={'btn-' + id } className="w-14 h-8 bg-slate-200 
        rounded-full flex items-center px-1" onClick={detectClick}>
            <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
        </div>
    )
}


let Settings = ({page, setPage, setting, setSetting}) => {
    let [status, setStatus] = useState({
        dark : JSON.parse(getCookie('darkMode')),
        auto : JSON.parse(getCookie('automatic'))
    });

    let clicked = () => {
        changePage('homepage');
        setPage(currentPage);
    }

    return (
        <>
            <button onClick={clicked} id="homepage" className="p-3 m-3 
            border-2 duration-300 border-black-200 rounded 
            hover:border-neutral-950">Back to Home</button>

            <div className="w-48 h-fit flex flex-col">
                <div className="w-inherit h-14 flex items-center justify-between">
                    <p className="text-ms">Dark Mode</p>
                    <Button id={'dark'} status={status} 
                    setStatus={setStatus}  setting={setting} setSetting={setSetting}/>
                </div>

                <div className="w-inherit h-14 flex items-center justify-between">
                    <p className="text-ms">Automatic Dice</p>
                    <Button id={'auto'} status={status} 
                    setStatus={setStatus} setting={setting} setSetting={setSetting}/>
                </div>
            </div>
        </>
    )
}

export default Settings;