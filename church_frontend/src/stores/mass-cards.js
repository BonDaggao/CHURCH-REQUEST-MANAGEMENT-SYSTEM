import { defineStore } from "pinia";
import useMassCardRepistory from "../api/mass-cards";
import router from "../router";
import mailer from "../api/mailer";
export const useMassCardStore = defineStore('mass-cards', {
    actions: {

        async Masscardcreate(payload) {
            const response = await useMassCardRepistory.create(payload)
            if(response.status === 200){
                mailer.sendmail({email: payload.email})
            }
            return response.data
            
        },

        async getAll() {
            const response = await useMassCardRepistory.getAll()
            console.log(response, 'res')
            return response.data
            
        },
    }
})