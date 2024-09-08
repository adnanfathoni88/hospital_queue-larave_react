import React, { useEffect } from 'react';
import { useState } from 'react';
import Modal from '../components/Modal';
import {
  useFetchPatients,
  useGetPatientById,
  useAddPatient,
} from '../hooks/Patient';
import { FaPencil, FaTrash } from 'react-icons/fa6';

const PatientList = () => {
  // read
  const [refetchTrigger, setRefetchTrigger] = useState(false); // refetch trigger
  const { patients, loading } = useFetchPatients(refetchTrigger); // hook

  // store
  const { addNewPatient, error: AddError } = useAddPatient(handleSuccess); // hook
  const [success, setSuccess] = useState(false); // success callback

  // edit
  const [selectedId, setSelectedId] = useState<any>(); // selected id
  const { patient: selectedPatient } = useGetPatientById(selectedId); // hook

  // modal
  const [showModal, setShowModal] = useState<boolean>(false); // show modal
  const [titleModal, setTitleModal] = useState(''); // title
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    doctor: '',
  });

  const handleModal = (type: string | boolean, id?: any) => {
    const title = type === 'add' ? 'Add Patient' : 'Edit Patient'; // tittle modal
    setTitleModal(title);

    if (id) {
      setSelectedId(id);
    } else {
      setFormData({
        name: '',
        phone: '',
        address: '',
        doctor: '',
      });
      setShowModal(true);
    }
  };

  // coba
  useEffect(() => {
    if (selectedPatient) {
      setFormData({
        name: selectedPatient.name,
        phone: selectedPatient.phone,
        address: selectedPatient.address,
        doctor: selectedPatient.doctor,
      });
      setShowModal(true);
    }
  }, [selectedPatient]);

  // submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewPatient(formData);
  };

  // success
  function handleSuccess() {
    setRefetchTrigger((prev) => !prev);
    handleModal(false);
    setFormData({
      name: '',
      phone: '',
      address: '',
      doctor: '',
    });

    // pop up success
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  }

  // error
  const formatError = (errorString: string) => {
    return errorString
      .split(',')
      .map((msg, index) => <div key={index}>{msg.trim()}</div>);
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Modal
        showModal={showModal} // show modal
        setShowModal={setShowModal} // set show modal
        title={titleModal} // title modal
      >
        {AddError && (
          <div className="bg-red-100 mb-4 text-red-700 border border-red-400 rounded-md p-3 my-3">
            {formatError(AddError)}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-black dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
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
              value={formData.phone}
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
              value={formData.address}
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
              value={formData.doctor}
              onChange={(e) =>
                setFormData({ ...formData, doctor: e.target.value })
              }
              className="w-full border border-stroke dark:border-strokedark rounded-md p-2.5 dark:bg-boxdark"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white py-3 w-full px-4 rounded-md bg-primary hover:bg-primary/80"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* error */}
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            List of Patients
          </h2>
          <button
            onClick={() => handleModal('add')}
            className="text-white py-2 px-3 rounded-md bg-primary hover:bg-primary/80"
          >
            Add New
          </button>
        </div>
        {success && (
          <div className="bg-green-100 mb-4 text-green-700 border border-green-400 rounded-md p-3 my-3">
            Patient added successfully!
          </div>
        )}
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
                className="border-t border-stroke dark:border-strokedark hover:bg-slate-100/50"
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
                  <button
                    onClick={() => handleModal('edit', patient.id)}
                    className="py-2 px-3 rounded-md text-slate-6  00 hover:text-primary"
                  >
                    {<FaPencil />}
                  </button>
                  <button className="py-2 px-3 rounded-md text-slate-6  00 hover:text-primary">
                    {<FaTrash />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
