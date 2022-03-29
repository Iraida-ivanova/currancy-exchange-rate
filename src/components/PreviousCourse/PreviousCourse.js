import React from 'react';
import "./PreviousCourse.css";

const PreviousCourse = ({item}) => {
    return (
        <li className={"previous-course"}>
            <div>{item.date}</div>
            <div>{item.value}</div>
        </li>
    );
};

export default PreviousCourse;