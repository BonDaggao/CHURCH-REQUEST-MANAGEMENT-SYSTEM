import api from "./api";

export default {
  create(payload){
    return api.post('/anointing', payload);
  },
  getById(id){
    return api.get(`/anointing/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/anointing/${id}`, payload);
  },

  getAll(){
    return api.get(`/anointing/admin/all`);
  },

  getAllApproved(){
    return api.get(`/anointing/admin/approved`);
  },

  getAllPending(){
    return api.get(`/anointing/admin/pending`);
  },

  getAllRejected(){
    return api.get(`/anointing/admin/rejected`);
  },

  approve(id){
    return api.put(`/anointing/approve/${id}`);
  },

  reject(id){
    return api.put(`/anointing/reject/${id}`);
  },
};
