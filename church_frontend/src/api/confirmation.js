import api from "./api";

export default {
  create(payload){
    return api.post('/confirmation', payload);
  },
  getAll(){
    return api.get(`/confirmation/${sessionStorage.getItem("user_id")}`);
  },

  getById(id){
    return api.get(`/confirmation/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/confirmation/${id}`, payload);
  },
};
