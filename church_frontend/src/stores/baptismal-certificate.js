import { defineStore } from "pinia";
import useBaptismalCertificateRepository from "../api/baptismal-certificate";
import router from "../router";
import mailer from "../api/mailer";

export const useBaptismalCertificateStore = defineStore('baptismal-certificate', {
    actions: {

        async Baptismalcreate(payload) {
            const response = await useBaptismalCertificateRepository.create(payload)
            console.log(response, 'res')
            if(response.status === 200){
                mailer.sendmail({email: payload.email})
            }
            return response.data
            
        },

        async getAll() {
            const response = await useBaptismalCertificateRepository.getAll()
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