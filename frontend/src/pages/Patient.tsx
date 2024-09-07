import React from 'react';
import { useState } from 'react';
import usePatients from '../hooks/Patient';
import Modal from '../components/Modal';

const PatientList = () => {
  const { patients, loading, error } = usePatients();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    doctor: '',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message}</p>;

  const handleModal = (isTrue: boolean) => {
    setShowModal(isTrue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Modal
        title={'Add Patient'} // modal title
        showModal={showModal} // show or hide modal
        handleModal={handleModal} // function to close modal
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-black dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-stroke dark:border-strokedark rounded-md p-2.5 dark:bg-boxdark"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-black dark:text-white">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full border border-stroke dark:border-strokedark rounded-md p-2.5 dark:bg-boxdark"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-black dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full border border-stroke dark:border-strokedark rounded-md p-2.5 dark:bg-boxdark"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="doctor"
              className="block text-black dark:text-white"
            >
              Doctor
            </label>
            <input
              type="text"
              id="doctor"
              name="doctor"
              onChange={(e) =>
                setFormData({ ...formData, doctor: e.target.value })
              }
              className="w-full border border-stroke dark:border-strokedark rounded-md p-2.5 dark:bg-boxdark"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white py-3 w-full px-4 rounded-md bg-primary hover:font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            List of Patients
          </h2>
          <button
            onClick={() => handleModal(true)}
            className="text-white py-2 px-3 rounded-md bg-primary hover:font-semibold"
          >
            Add New
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                No
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Nama
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Telepon
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Alamat
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Dokter
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {patients?.map((patient, index) => (
              <tr
                key={patient.id}
                className="border-t border-stroke dark:border-strokedark"
              >
                <td className="py-4 px-4 text-black dark:text-white xl:pl-11">
                  {index + 1}
                </td>
                <td className="py-4 px-4 text-black dark:text-white xl:pl-11">
                  {patient?.name}
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  {patient?.phone}
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  {patient?.address}
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  {patient?.doctor}
                </td>
                <td className="py-4 px-4 text-black dark:text-white">
                  <button className="text-primary hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    // <div>
    //   <h2>List of Patients</h2>
    //   <ul>
    //     {patients?.map((patient) => <li key={patient.id}>{patient.name}</li>)}
    //   </ul>
    // </div>
  );
};

export default PatientList;
