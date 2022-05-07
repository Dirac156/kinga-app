import { isObjectEmpty } from "./helpers.js"

class GlobalStates {
    constructor() {
        this.variables = {
            dbConnection: false,
            apiConnection: false
        };
    }

    async updateGlobalVariables(payload) {
        if ( !isObjectEmpty(payload) ){
            this.variables = { ...this.variables, ...payload}
        }
    }
 }

export const States = new GlobalStates();
