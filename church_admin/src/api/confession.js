import api from "./api";

export default {
  create(payload){
    return api.post('/confession', payload);
  },

  getById(id){
    return api.get(`/confession/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/confession/${id}`, payload);
  },

  getAll(){
    return api.get(`/confession/admin/all`);
  },

  getAllApproved(){
    return api.get(`/confession/admin/approved`);
  },

  getAllRejected(){
    return api.get(`/confession/admin/rejected`);
  },

  getAllPending(){
    return api.get(`/confession/admin/pending`);
  },

  approve(id){
    return api.put(`/confession/approve/${id}`);
  },

  reject(id){
    return api.put(`/confession/reject/${id}`);
  },
};
