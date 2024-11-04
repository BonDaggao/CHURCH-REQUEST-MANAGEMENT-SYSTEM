import { defineStore } from "pinia";
import baptismRepository from "../api/baptism";
import router from "../router";
import baptism from "../api/baptism";

export const useBaptismStore = defineStore('baptism', {
    actions: {

        async create(payload) {
            console.log('payload')
            const response = await baptism.create(payload)
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

        async getAll() {
            const response = await baptism.getAll()
            return response.data
        },

        async getAllRejected() {
            const response = await baptism.getAllRejected()
            return response.data
        },

        async getAllApproved() {
            const response = await baptism.getAllApproved()
            return response.data
        },

        async getAllPending() {
            const response = await baptism.getAllPending()
            return response.data
        },

        async approve(id) {
            const response = await baptism.approve(id)
            console.log(response, 'res')
            return response.data
        },

        async reject(id) {
            const response = await baptism.reject(id)
            console.log(response, 'res')
            return response.data
        },
        

    }
})