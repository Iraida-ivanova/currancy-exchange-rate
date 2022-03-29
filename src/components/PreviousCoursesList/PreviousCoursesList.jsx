import React from 'react';
import "./PreviousCoursesList.css";
import PreviousCourse from "../PreviousCourse";

const PreviousCoursesList = ({list}) => {
    return (
        <div className={"previous-courses-list"}>
            <ul>
                {list.map((item)=>{
                    return (
                        <PreviousCourse item={item} key={item.date}/>
                    )
                })}
            </ul>
        </div>
    );
};

export default PreviousCoursesList;