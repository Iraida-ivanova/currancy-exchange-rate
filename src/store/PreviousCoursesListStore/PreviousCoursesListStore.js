import ApiStore from "../../shared/store/ApiStore/ApiStore";
import {formatDate} from "../../utils/formatDate";

const url = "https://www.cbr-xml-daily.ru/daily_json.js";

export default class PreviousCoursesListStore {

    apiStore = new ApiStore(url);
    list = [];
    meta = "initial";
    constructor(code) {
        this.code = code;
    }
    async getPrevCoursesList() {
        this.meta = "loading";
        this.list = [];

        try {
            let res = await this.apiStore.request();
            if (res.success) {
                this.list.push({
                    date: formatDate(new Date(res.data.Date)),
                    value: res.data.Valute[`${this.code}`].Value,
                });
                for (let i=0; i<9; i++) {
                    try {
                        this.apiStore.baseUrl = res.data.PreviousURL;
                        let result =await this.apiStore.request();
                        if (result.success) {
                            this.meta = "success";
                            res = result;
                            this.list.push({
                                date:formatDate(new Date(result.data.Date)),
                                value:result.data.Valute[`${this.code}`].Value
                            });
                        } else {
                            this.meta = "error";
                        }
                    } catch (error) {
                        break;
                    }
                }
            } else {
                this.meta = "error";
            }
        } catch (error) {
            this.meta = "error";
            this.list = [];
        }
        this.apiStore.baseUrl = url;
        return {
            list:this.list,
            meta:this.meta
        };
    }

    destroy() {
        this.list = [];
        this.meta = "initial";
    }
}