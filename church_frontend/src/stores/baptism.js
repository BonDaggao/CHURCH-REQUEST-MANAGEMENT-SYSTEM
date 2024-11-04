import { defineStore } from "pinia";
import baptismRepository from "../api/baptism";
import router from "../router";
import baptism from "../api/baptism";
import mailer from "../api/mailer";

export const useBaptismStore = defineStore('baptism', {
    actions: {

        async create(payload) {
            console.log('payload')
            const response = await baptism.create(payload)
            if(response.status === 200){
                mailer.sendmail({email: payload.email})
            }
            return response.data
            
        },

        async getAll() {
            const response = await baptism.getAll()
            console.log(response, 'res')
            return response.data
        },
        async getByID(id) {
            const response = await baptism.getById(id)
            console.log(response, 'res')
            return response.data
        },
        async updateByID(id, payload) {
            const response = await baptism.updatetById(id, payload)
            console.log(response, 'res')
            return response.data
        },

    }
})