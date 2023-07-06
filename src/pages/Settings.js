import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentPage, changePage } from "./Page";
import { getCookie, setCookie } from "../reducers/Cookie";


let Button = ({id}) => {
    let data = useSelector(state => state);
    let dataToToggle = {
        automatic: data.automatic,
        darkMode: data.darkMode    
    }
    let dispatch = useDispatch();


    let detectClick = (event) => {
        let id = event.target.id;
        dispatch({
            type: 'toggleFunction', 
            payload: id.replace('btn-', '')
        });
        dispatch({type: 'setTheme'})

        event.target.style.justifyContent == ""
            ? event.target.style.justifyContent = "flex-end"
            : event.target.style.justifyContent = ""
    }

    useEffect(() => {
        for (let i in dataToToggle){
            let btn = document.getElementById(`${i}`);

            dataToToggle[i] == 'true' 
                ? btn.style.justifyContent = 'flex-end'
                : btn.style.justifyContent = ''
        }
    }, []);

    return (
        <div id={id} className="w-14 h-8 bg-slate-200 
        rounded-full flex items-center px-1" onClick={detectClick}>
            <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
        </div>
    )
}


let Settings = ({page, setPage}) => {
    let clicked = () => {
        changePage('homepage');
        setPage(currentPage);
    }

    return (
        <div className="w-80 h-full">
            <div id="settings" className="w-inherit h-fit flex flex-col content-center flex-wrap">
                <div className="w-inherit h-20 flex justify-center content-center flex-wrap">
                    <button onClick={clicked} id="homepage" className="w-32 
                    h-12 border-2 duration-300 border-black-200 rounded 
                    hover:border-neutral-950">Back to Home</button>
                </div>

                <div className="w-inherit h-14 flex items-center justify-between">
                    <p className="text-ms">Dark Mode</p>
                    <Button id={'darkMode'} />
                </div>

                <div className="w-inherit h-14 flex items-center justify-between">
                    <p className="text-ms">Automatic Dice</p>
                    <Button id={'automatic'} />
                </div>

                <ShutTheBox />

                <ColorPicker />    
            </div>
        </div>
    )
}


let ShutTheBox = () => {
    return(
        <div className="py-5 w-11/12 h-7/12 text-center md:w-inherit">
            <p className="py-3">Set Shut The Box Theme Color</p>
            <div className="w-inherit h-1 flex flex-row justify-evenly
            flex-wrap text-center border-4 border-transparent">
                <div id="stick-num" className="w-5 h-12 text-slate-50 bg-yellow-800 sm:w-6">1</div>
                <div id="stick-num" className="w-5 h-12 text-slate-50 bg-yellow-800 sm:w-6">2</div>
                <div id="stick-num" className="w-5 h-12 text-slate-50 bg-yellow-800 sm:w-6">3</div>
            </div>

            <div id="big-gap" className="w-inherit h-10 bg-amber-600
            border-8 border-yellow-900"></div>

            <div id="small-gap" className="w-inherit h-7 border-t-0 bg-amber-600 border-yellow-900 border-8"></div>

            <div id="big-board" className="w-inherit h-56
            border-8 border-t-0 border-yellow-900 bg-amber-600
            flex flex-col justify-center flex-wrap
            md:grid grid-cols-2 gap-2 justify-items-center content-center">
                <div id="dice" className="dice">
                    <div id="dice-dot" className="dice-dot"></div>
                    <div id="dice-dot" className="dice-dot"></div>
                    <div id="dice-dot" className="dice-dot"></div>
                    <div id="dice-dot" className="dice-dot"></div>
                    <div id="dice-dot" className="dice-dot"></div>
                </div>

                <div id="dice" className="dice">
                    <div id="dice-dot" className="dice-dot"></div>
                    <div id="dice-dot" className="dice-dot"></div>
                    <div id="dice-dot" className="dice-dot"></div>
                </div>
            </div>
        </div>
    )
}


let ColorPicker = () => {
    let data = useSelector(state => state);
    let dispatch = useDispatch();

    let items = ['#big-gap', '#small-gap', '#big-board']
    let sticks = '#stick-num';

    let detectColor = (e) => {
        if (e.target.id == 'foreground'){
            let allStick = document.querySelectorAll(sticks);

            allStick.forEach(stick => {
                stick.style.background = e.target.value
            })
            
            for (let i in items){
                document.querySelector(items[i]).style.borderColor = e.target.value;
            }

            setCookie('woodColor', e.target.value);
        }

        else{
            for (let i in items){
                document.querySelector(items[i]).style.background = e.target.value;
            }

            setCookie('boardColor', e.target.value);
        }
    }

    useEffect(() => {
        let foreground = getCookie('woodColor');
        let background = getCookie('boardColor');
        let allStick = document.querySelectorAll(sticks);

        allStick.forEach(stick => {
            stick.style.background = foreground
        })

        for (let i in items){
            let item = document.querySelector(items[i]);
            item.style.borderColor = foreground;
            item.style.background = background;
        }

        document.querySelector('#foreground').value = foreground;
        document.querySelector('#background').value = background;
    }, [])


    return(
        <div className="w-inherit h-48 flex flex-col gap-10">
            <div className="w-full h-10">
                <p className="py-1">Wooden Part</p>
                <input className="w-full h-8" type="color" 
                id="foreground" onChange={detectColor} />
            </div>

            <div className="w-full h-10">
                <p className="py-1">Board Part</p>
                <input className="w-full h-8" type="color"
                id="background" onChange={detectColor} />
            </div>
        </div>
    )
}

export default Settings;