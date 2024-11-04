import { defineStore } from "pinia";
import anointingrepository from "../api/anointing";
import router from "../router";
import mailer from "../api/mailer";

export const useAnointingStore = defineStore('anointing', {
    actions: {

        async create(payload) {
            console.log('anointing')
            const response = await anointingrepository.create(payload)
            console.log(response, 'res')
            if(response.status === 200){
                mailer.sendmail({email: payload.email})
            }
            return response.data
            
        },

        async getAll() {
            const response = await anointingrepository.getAll(sessionStorage.getItem("user_id"))
            return response.data
        },

        async getByID(id) {
            const response = await anointingrepository.getById(id)
            console.log(response, 'res')
            return response.data
        },
        async updateByID(id, payload) {
            const response = await anointingrepository.updatetById(id, payload)
            console.log(response, 'res')
            return response.data
        },
    }
})