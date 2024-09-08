import React, { ReactNode } from 'react';

interface ModalProps {
  showModal: boolean; // Tampilkan modal
  setShowModal: (show: boolean) => void; // Set tampilan modal
  title: string; // Judul modal
  children?: ReactNode; // Konten modal
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  title,
  children,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed z-99999 inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg w-1/3 p-6">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <h2 className="text-xl font-semibold text-black">{title}</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-red-500 font-semibold text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
