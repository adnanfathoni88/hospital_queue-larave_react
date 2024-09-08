import { useState, useEffect } from 'react';
import { getAllPatients, getPatientsById, addPatient } from '../api/patientApi';
import { Patient } from '../types/Patient';

// fetch all patients
export const useFetchPatients = (triggerRefetch: any) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const patients = async () => {
      try {
        const data = await getAllPatients();
        setPatients(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    patients();
  }, [triggerRefetch]);

  return { patients, loading, error };
};

// get patient by id
export const useGetPatientById = (id: number) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getPatientsById(id);
        setPatient(data.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  return { patient, loading, error };
};

// add patient
export const useAddPatient = (handleSuccess: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // string untuk pesan error

  const addNewPatient = async (patient: Patient) => {
    setLoading(true);
    setError(null);

    try {
      await addPatient(patient);
      handleSuccess();
    } catch (error: any) {
      if (error && typeof error === 'object') {
        console.log(error);
        const errorMessages = Object.entries(error)
          .map(([field, messages]) => `${messages} `)
          .join(', ');
        setError(errorMessages); // Menyimpan pesan error
      }
    } finally {
      setLoading(false);
    }
  };

  return { addNewPatient, loading, error };
};
