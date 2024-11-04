import api from "./api";

export default {
  create(payload){
    return api.post('/mass-cards', payload);
  },
  getAll(){
    return api.get(`/mass-cards/${sessionStorage.getItem("user_id")}`);
  },
};
