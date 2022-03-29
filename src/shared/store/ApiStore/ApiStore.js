export default class ApiStore {
    constructor(baseUrl) {
        this.baseUrl= baseUrl;
    }
    async request() {
        try {
            let response = await fetch(this.baseUrl);
            if (response.ok) {
                return {
                    success: true,
                    data: await response.json(),
                };
            } else {
                return {
                    success: false,
                    data: await response.json(),
                };
            }
        } catch (error) {
            return error;
        }
    }
}
