import api from "./api";

export default {
  sendmail(payload){
    return api.post('/mailsender', payload);
  },
};
