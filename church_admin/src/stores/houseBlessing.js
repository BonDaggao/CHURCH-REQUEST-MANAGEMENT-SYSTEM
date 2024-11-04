import { defineStore } from "pinia";
import houseBlessingrepository from "../api/houseBlessing";
import router from "../router";

export const useHouseBlessingStore = defineStore('houseBlessing', {
    actions: {

        async create(payload) {
            console.log('houseBlessing')
            const response = await houseBlessingrepository.create(payload)
            console.log(response, 'res')
            return response.data
            
        },

        async getByID(id) {
            const response = await houseBlessingrepository.getById(id)
            console.log(response, 'res')
            return response.data
        },
        async updateByID(id, payload) {
            const response = await houseBlessingrepository.updatetById(id, payload)
            console.log(response, 'res')
            return response.data
        },

        async getAll() {
            const response = await houseBlessingrepository.getAll()
            return response.data
        },

        async getAllRejected() {
            const response = await houseBlessingrepository.getAllRejected()
            return response.data
        },

        async getAllApproved() {
            const response = await houseBlessingrepository.getAllApproved()
            return response.data
        },

        async getAllPending() {
            const response = await houseBlessingrepository.getAllPending()
            return response.data
        },

        async approve(id) {
            const response = await houseBlessingrepository.approve(id)
            console.log(response, 'res')
            return response.data
        },

        async reject(id) {
            const response = await houseBlessingrepository.reject(id)
            console.log(response, 'res')
            return response.data
        },
    }
})