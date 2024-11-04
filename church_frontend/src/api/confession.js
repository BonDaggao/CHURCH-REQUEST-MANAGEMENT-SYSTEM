import api from "./api";

export default {
  create(payload){
    return api.post('/confession', payload);
  },
  getAll(){
    return api.get(`/confession/${sessionStorage.getItem("user_id")}`);
  },

  getById(id){
    return api.get(`/confession/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/confession/${id}`, payload);
  },
};
