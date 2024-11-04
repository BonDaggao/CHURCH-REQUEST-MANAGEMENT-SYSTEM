import { defineStore } from "pinia";
import confessionRepository from "../api/confession";
import router from "../router";
import mailer from "../api/mailer";

export const useConfessionStore = defineStore('cofession', {
    actions: {

        async create(payload) {
            console.log('cofession')
            const response = await confessionRepository.create(payload)
            if(response.status === 200){
                mailer.sendmail({email: payload.email})
            }
            return response.data
            
        },

        async getAll() {
            const response = await confessionRepository.getAll()
            console.log(response, 'res')
            return response.data
            
        },

        async getByID(id) {
            const response = await confessionRepository.getById(id)
            console.log(response, 'res')
            return response.data
        },
        async updateByID(id, payload) {
            const response = await confessionRepository.updatetById(id, payload)
            console.log(response, 'res')
            return response.data
        },
    }
})