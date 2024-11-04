import { defineStore } from "pinia";
import anointingrepository from "../api/anointing";
import router from "../router";

export const useAnointingStore = defineStore('anointing', {
    actions: {

        async create(payload) {
            console.log('anointing')
            const response = await anointingrepository.create(payload)
            console.log(response, 'res')
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

        async getAll() {
            const response = await anointingrepository.getAll()
            return response.data
        },

        async getAllRejected() {
            const response = await anointingrepository.getAllRejected()
            return response.data
        },

        async getAllApproved() {
            const response = await anointingrepository.getAllApproved()
            return response.data
        },

        async getAllPending() {
            const response = await anointingrepository.getAllPending()
            return response.data
        },

        async approve(id) {
            const response = await anointingrepository.approve(id)
            console.log(response, 'res')
            return response.data
        },

        async reject(id) {
            const response = await anointingrepository.reject(id)
            console.log(response, 'res')
            return response.data
        },
    }
})