import { defineStore } from "pinia";
import confessionRepository from "../api/confession";
import router from "../router";

export const useConfessionStore = defineStore('cofession', {
    actions: {

        async create(payload) {
            console.log('cofession')
            const response = await confessionRepository.create(payload)
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

        async getAll() {
            const response = await confessionRepository.getAll()
            return response.data
        },

        async getAllRejected() {
            const response = await confessionRepository.getAllRejected()
            return response.data
        },

        async getAllApproved() {
            const response = await confessionRepository.getAllApproved()
            return response.data
        },

        async getAllPending() {
            const response = await confessionRepository.getAllPending()
            return response.data
        },

        async approve(id) {
            const response = await confessionRepository.approve(id)
            console.log(response, 'res')
            return response.data
        },

        async reject(id) {
            const response = await confessionRepository.reject(id)
            console.log(response, 'res')
            return response.data
        },
    }
})