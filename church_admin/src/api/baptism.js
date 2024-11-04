import api from "./api";

export default {
  create(payload){
    console.log('baptism')
    return api.post('/baptism', payload);
  },


  getById(id){
    return api.get(`/baptism/details/${id}`);
  },
  updatetById(id, payload){
    return api.put(`/baptism/${id}`, payload);
  },

  getAll(){
    return api.get(`/baptism/admin/all`);
  },

  getAllApproved(){
    return api.get(`/baptism/admin/aprroved`);
  },

  getAllRejected(){
    return api.get(`/baptism/admin/rejected`);
  },

  getAllPending(){
    return api.get(`/baptism/admin/pending`);
  },

  approve(id){
    return api.put(`/baptism/approve/${id}`);
  },

  reject(id){
    return api.put(`/baptism/reject/${id}`);
  },
};
