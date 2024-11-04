import api from "./api";

export default {
  create(payload){
    return api.post('/baptismal-certificate', payload);
  },

  getAll(){
    return api.get(`/baptismal-certificate/${sessionStorage.getItem("user_id")}`);
  },

  getById(id){
    return api.get(`/baptism-certificate/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/baptism-certificate/${id}`, payload);
  },
};
