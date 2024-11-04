import { defineStore } from "pinia";
import useMarriageCertificateRepository from "../api/marriage-certificate";
import router from "../router";
import mailer from "../api/mailer";

export const useMarriageCertificateStore = defineStore('marriage-certificate', {
    actions: {

        async Marriagecreate(payload) {
            const response = await useMarriageCertificateRepository.create(payload)
            if(response.status === 200){
                mailer.sendmail({email: payload.email})
            }
            return response.data
            
        },

        async getAll() {
            const response = await useMarriageCertificateRepository.getAll()
            console.log(response, 'res')
            return response.data
            
        },
    }
})