import http from '../services/http';


export const marketingService = {
  getAll: () => http.get('/marketing'), 
  
  create: (data: FormData) => http.post('/marketing', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  delete: (id: string) => http.delete(`/marketing/${id}`),
};


