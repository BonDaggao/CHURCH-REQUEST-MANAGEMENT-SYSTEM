import { defineStore } from "pinia";
import confirmationRepository from "../api/confirmation";
import router from "../router";

export const useConfirmationStore = defineStore('confrimation', {
    actions: {

        async create(payload) {
            console.log('confrimation')
            const response = await confirmationRepository.create(payload)
            console.log(response, 'res')
            return response.data
            
        },

        async getByID(id) {
            const response = await confirmationRepository.getById(id)
            console.log(response, 'res')
            return response.data
        },
        async updateByID(id, payload) {
            const response = await confirmationRepository.updatetById(id, payload)
            console.log(response, 'res')
            return response.data
        },

        async getAll() {
            const response = await confirmationRepository.getAll()
            return response.data
        },

        async getAllRejected() {
            const response = await confirmationRepository.getAllRejected()
            return response.data
        },

        async getAllApproved() {
            const response = await confirmationRepository.getAllApproved()
            return response.data
        },

        async getAllPending() {
            const response = await confirmationRepository.getAllPending()
            return response.data
        },

        async approve(id) {
            const response = await confirmationRepository.approve(id)
            console.log(response, 'res')
            return response.data
        },

        async reject(id) {
            const response = await confirmationRepository.reject(id)
            console.log(response, 'res')
            return response.data
        },
    }
})