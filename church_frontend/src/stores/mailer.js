import { defineStore } from "pinia";
import baptismRepository from "../api/baptism";
import router from "../router";
import mailer from "../api/mailer";

export const useMailerStore = defineStore('baptism', {
    actions: {

        async sendmail(payload) {
            console.log('payload')
            const response = await mailer.sendmail(payload)
            console.log(response, 'res')
            return response.data
            
        },

    }
})