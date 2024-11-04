import { defineStore } from "pinia";
import sampleRepository from "../api/sample";
import router from "../router";

const actions = {
    async getAllData() {
     
        const data = await sampleRepository.getAll()
        return data.data
        
    },
}

export const usesampleStore = defineStore("sampleStore", {
    persist: {
      storage: sessionStorage,
      paths: ['modules','forgot','username'],
    },
    actions,
  });