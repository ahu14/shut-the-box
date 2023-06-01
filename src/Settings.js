import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentPage, changePage } from "./Page";

let Button = ({id}) => {
    let data = useSelector(state => state);
    let auto = useSelector(state => state.automatic);
    let darkMode = useSelector(state => state.darkMode);
    let dispatch = useDispatch();

    let detectClick = (event) => {
        event.target.id.includes('dark')
            ? dispatch({type: 'toggleTheme'})
            : dispatch({type: 'toggleAuto'});

        event.target.style.justifyContent == ""
            ? event.target.style.justifyContent = "flex-end"
            : event.target.style.justifyContent = ""
    }

    useEffect(() => {
        let btn_auto = document.getElementById('btn-auto');
        let btn_dark = document.getElementById('btn-dark');

        darkMode == 'true'
            ? btn_dark.style.justifyContent = "flex-end"
            : btn_dark.style.justifyContent = ""
        
        auto == 'true'
            ? btn_auto.style.justifyContent = "flex-end"
            : btn_auto.style.justifyContent = ""
    }, []);

    return (
        <div id={'btn-' + id } className="w-14 h-8 bg-slate-200 
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
        <>
            <button onClick={clicked} id="homepage" className="p-3 m-3 
            border-2 duration-300 border-black-200 rounded 
            hover:border-neutral-950">Back to Home</button>

            <div id="settings" className="w-48 h-fit flex flex-col">
                <div className="w-inherit h-14 flex items-center justify-between">
                    <p className="text-ms">Dark Mode</p>
                    <Button id={'dark'} />
                </div>

                <div className="w-inherit h-14 flex items-center justify-between">
                    <p className="text-ms">Automatic Dice</p>
                    <Button id={'auto'} />
                </div>
            </div>
        </>
    )
}

export default Settings;