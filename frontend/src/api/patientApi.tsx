import axios from 'axios';
import { baseUrl } from '../utils/utils';

interface Patient {
  name: string;
  phone: string;
  address: string;
  doctor: string;
}

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

// add a patient
export const addPatient = async (patient: Patient) => {
  try {
    const response = await baseUrl.post('/patients', patient);
    return response.data;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};
