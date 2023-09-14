import axios, { AxiosResponse } from 'axios';

export class DataService {
    private baseUrl: string = 'http://localhost:3000';
  
    async getUsers(): Promise<any[]> {
        const response = await axios.get(`${this.baseUrl}/users`);
        return response.data;
    }

    async getWorkSite(): Promise<any[]> {
        const response = await axios.get(`${this.baseUrl}/worksite`);
        return response.data;
    }

    async getAssignment(): Promise<any[]> {
        const response = await axios.get(`${this.baseUrl}/assignment`);
        return response.data;
    }
    async getSupportSchedule(): Promise<any[]> {
        const response = await axios.get(`${this.baseUrl}/support_schedule`);
        return response.data;
    }
    async addShift(shiftData: any): Promise<any> {
        const response = await axios.post(`${this.baseUrl}/support_schedule`, shiftData);
        return response.data;
      }

      async getJoinedData(): Promise<any[]> {
        return axios.get(`${this.baseUrl}/joined_data`).then(response => response.data);
    }
  }