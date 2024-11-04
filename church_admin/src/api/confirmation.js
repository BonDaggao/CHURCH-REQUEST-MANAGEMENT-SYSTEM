import api from "./api";

export default {
  create(payload){
    return api.post('/confirmation', payload);
  },

  getById(id){
    return api.get(`/confirmation/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/confirmation/${id}`, payload);
  },

  getAll(){
    return api.get(`/confirmation/admin/all`);
  },

  getAllApproved(){
    return api.get(`/confirmation/admin/approved`);
  },

  getAllRejected(){
    return api.get(`/confirmation/admin/rejected`);
  },

  getAllPending(){
    return api.get(`/confirmation/admin/pending`);
  },

  approve(id){
    return api.put(`/confirmation/approve/${id}`);
  },

  reject(id){
    return api.put(`/confirmation/reject/${id}`);
  },
};
