import api from "./api";

export default {
  create(payload){
    console.log('marriage')
    return api.post('/marriage', payload);
  },

  getById(id){
    return api.get(`/marriage/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/marriage/${id}`, payload);
  },

  getAll(){
    return api.get(`/marriage/admin/all`);
  },

  getAllApproved(){
    return api.get(`/marriage/admin/aprroved`);
  },

  getAllRejected(){
    return api.get(`/marriage/admin/rejected`);
  },

  getAllPending(){
    return api.get(`/marriage/admin/pending`);
  },

  approve(id){
    return api.put(`/marriage/approve/${id}`);
  },

  reject(id){
    return api.put(`/marriage/reject/${id}`);
  },
};
