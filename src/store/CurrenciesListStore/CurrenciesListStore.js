import ApiStore from "../../shared/store/ApiStore/ApiStore";
import {normalizeCurrenciesList} from "../models/currencyList";

const url = "https://www.cbr-xml-daily.ru/daily_json.js";
export default class CurrenciesListStore {

    apiStore = new ApiStore(url);
    list = [];
    meta = "initial";

    async getCurrencyList() {
        this.meta = "loading";
        this.list = [];
        try {
            const result = await this.apiStore.request();
            if (result.success) {
                this.meta = "success";
                this.list = normalizeCurrenciesList(result.data);
            } else {
                this.meta = "error";
                }
        } catch(error) {
            this.meta = "error";
            this.list = [];
        }
        return {
            list:this.list,
            meta:this.meta
        };
    };

    destroy() {
        this.list = [];
        this.meta = "initial";
    }

}