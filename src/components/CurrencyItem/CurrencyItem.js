import React, {useEffect, useState} from 'react';
import "./CurrencyItem.css";
import ToolTip from "../Tooltip";
import PreviousCoursesList from "../PreviousCoursesList";
import {useLocalStore} from "../../utils/UseLocalStore";
import PreviousCoursesListStore from "../../store/PreviousCoursesListStore/PreviousCoursesListStore";

const CurrencyItem = ({currency}) => {
    const previousCoursesListStore = useLocalStore(()=>new PreviousCoursesListStore(currency.code));
    const [diffClass, setDiffClass] = useState("currency__difference");
    const [isSelected, setIsSelected] = useState(false);
    const [coords, setCoords] = useState({left:0, top:0});
    const [meta, setMeta] = useState("initial");
    const [list, setList] = useState([]);

    useEffect(()=>{
        (currency.difference < 0) ? setDiffClass("currency__difference_red") : setDiffClass("currency__difference_green");
    },[currency.difference])

    const selectElement =(event)=>{
        event.target.classList.add("currency__code_selected");
        setIsSelected(true);
        let elemCoords = event.target.getBoundingClientRect();
        setCoords({
            left: elemCoords.left + 30,
            top: (elemCoords.top > document.documentElement.clientHeight-40) ? (elemCoords.top - 30) : elemCoords.top + 16,
        })
    };
    const leaveElement = (event)=>{
        event.target.classList.remove("currency__code_selected");
        setIsSelected(false);
        setMeta("initial");
        setList([]);
    }
    const handleClick = (event) => {
        previousCoursesListStore.getPrevCoursesList().then((data)=>{
            let elemCoords = event.target.getBoundingClientRect();
            setList(data.list);
            setMeta(data.meta);
            setIsSelected(false);
            setCoords({
                left: elemCoords.left + 30,
                top: (elemCoords.top > document.documentElement.clientHeight-290) ? (elemCoords.top - 290) : elemCoords.top + 16,
            })
        });
    }
    return (
        <li>
            <div className={"currency__wrapper"}>
                <div className={"currency__code"} >
                    <span onMouseEnter={selectElement} onMouseOut={leaveElement} onClick={handleClick}>{currency.code}</span>
                    {isSelected && <ToolTip coords={coords} child={currency.name}/>}
                    {meta === "success" && <ToolTip coords={coords} child={<PreviousCoursesList list={list}/>}/>}
                </div>
                <div className={"currency__value"}>{currency.value}</div>
                <div className={`currency__difference ${diffClass}`}>{`${currency.difference}%`}</div>
            </div>
        </li>
    );
};

export default CurrencyItem;