import api from "./api";

export default {
  create(payload){
    return api.post('/house-blessing', payload);
  },
  getAll(){
    return api.get(`/house-blessing/${sessionStorage.getItem("user_id")}`);
  },

  getById(id){
    return api.get(`/house-blessing/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/house-blessing/${id}`, payload);
  },
};
