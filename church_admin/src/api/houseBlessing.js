import api from "./api";

export default {
  create(payload){
    return api.post('/house-blessing', payload);
  },
  getById(id){
    return api.get(`/house-blessing/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/house-blessing/${id}`, payload);
  },

  getAll(){
    return api.get(`/house-blessing/admin/all`);
  },

  getAllApproved(){
    return api.get(`/house-blessing/admin/aprroved`);
  },

  getAllRejected(){
    return api.get(`/house-blessing/admin/rejected`);
  },

  getAllPending(){
    return api.get(`/house-blessing/pending`);
  },

  approve(id){
    return api.put(`/house-blessing/approve/${id}`);
  },

  reject(id){
    return api.put(`/house-blessing/reject/${id}`);
  },
};
