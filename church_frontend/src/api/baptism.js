import api from "./api";

export default {
  create(payload){
    console.log('baptism')
    return api.post('/baptism', payload);
  },

  getAll(){
    return api.get(`/baptism/${sessionStorage.getItem("user_id")}`);
  },

  getById(id){
    return api.get(`/baptism/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/baptism/${id}`, payload);
  },
};
