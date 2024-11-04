import api from "./api";

export default {
  create(payload){
    return api.post('/anointing', payload);
  },
  getAll(){
    return api.get(`/anointing/${sessionStorage.getItem("user_id")}`);
  },

  getById(id){
    return api.get(`/anointing/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/anointing/${id}`, payload);
  },
};
