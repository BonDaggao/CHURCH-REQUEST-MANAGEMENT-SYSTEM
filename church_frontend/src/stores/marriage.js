import { defineStore } from "pinia";
import marriagerepository from "../api/marriage";
import router from "../router";
import mailer from "../api/mailer";

export const useMarriageStore = defineStore('marriage', {
    actions: {

        async create(payload) {
            console.log('marriage')
            const response = await marriagerepository.create(payload)
            if(response.status === 200){
                mailer.sendmail({email: payload.email})
            }
            return response.data
            
        },

        async getAll() {
            const response = await marriagerepository.getAll()
            console.log(response, 'res')
            return response.data
            
        },

        async getByID(id) {
            const response = await marriagerepository.getById(id)
            console.log(response, 'res')
            return response.data
        },
        async updateByID(id, payload) {
            const response = await marriagerepository.updatetById(id, payload)
            console.log(response, 'res')
            return response.data
        },
    }
})