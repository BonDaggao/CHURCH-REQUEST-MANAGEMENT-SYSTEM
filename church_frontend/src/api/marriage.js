import api from "./api";

export default {
  create(payload){
    console.log('marriage')
    return api.post('/marriage', payload);
  },
  getAll(){
    return api.get(`/marriage/${sessionStorage.getItem("user_id")}`);
  },

  getById(id){
    return api.get(`/marriage/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/marriage/${id}`, payload);
  },
};
