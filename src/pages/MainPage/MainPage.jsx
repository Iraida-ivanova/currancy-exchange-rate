import React, {useEffect, useState} from 'react';
import CurrenciesListStore from "../../store/CurrenciesListStore/CurrenciesListStore";
import CurrencyItem from "../../components/CurrencyItem";
import "./MainPage.css";
import {useLocalStore} from "../../utils/UseLocalStore";

const MainPage = () => {
    const store = useLocalStore(() => new CurrenciesListStore());

    const [currencyList, setCurrencyList] = useState([]);
    const [meta, setMeta] = useState("initial");
    useEffect(()=>{
        store.getCurrencyList().then((data)=>{
            setCurrencyList(data.list);
            setMeta(data.meta);
        });

    }, []);
    return (
        <div className={"main-page"}>
            <h1 className={"main-page__title"}>Курс валют ЦБ РФ</h1>
            {meta === "loading"&& <div>Список загружается...</div>}
            {meta === "success" &&
            <ul>
                {currencyList.map(item=> (<CurrencyItem currency={item} key={item.id}/>))}
            </ul>
            }
            {meta === "error"&& <div>Извините! Что-то пошло не так. Попробуйте перезагрузить страницу</div>}
        </div>
    );
};

export default MainPage;