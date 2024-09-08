import axios from 'axios';
import { baseUrl } from '../utils/utils';
import { Patient } from '../types/Patient';

// get all patients
export const getAllPatients = async () => {
  try {
    const response = await baseUrl.get('/patients');
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

// // get patient by id
export const getPatientsById = async (id: number) => {
  try {
    const response = await baseUrl.get(`/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw error;
  }
};

// add a patient
export const addPatient = async (patient: Patient) => {
  try {
    const response = await baseUrl.post('/patients', patient);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};
