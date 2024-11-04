import { defineStore } from "pinia";
import marriageRepository from "../api/marriage";
import router from "../router";

export const useMarriageStore = defineStore('marriage', {
    actions: {

        async create(payload) {
            console.log('marriage')
            const response = await marriageRepository.create(payload)
            console.log(response, 'res')
            return response.data
            
        },

        async getByID(id) {
            const response = await marriageRepository.getById(id)
            console.log(response, 'res')
            return response.data
        },
        async updateByID(id, payload) {
            const response = await marriageRepository.updatetById(id, payload)
            console.log(response, 'res')
            return response.data
        },

        async getAll() {
            const response = await marriageRepository.getAll()
            return response.data
        },

        async getAllRejected() {
            const response = await marriageRepository.getAllRejected()
            return response.data
        },

        async getAllApproved() {
            const response = await marriageRepository.getAllApproved()
            return response.data
        },

        async getAllPending() {
            const response = await marriageRepository.getAllPending()
            return response.data
        },

        async approve(id) {
            const response = await marriageRepository.approve(id)
            console.log(response, 'res')
            return response.data
        },

        async reject(id) {
            const response = await marriageRepository.reject(id)
            console.log(response, 'res')
            return response.data
        },
    }
})