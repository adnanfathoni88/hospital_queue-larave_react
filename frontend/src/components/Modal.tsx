import React, { ReactNode } from 'react';

interface ModalProps {
  title: string; // Judul modal
  showModal: boolean; // status modal
  handleModal: (isTrue: boolean) => void; // Fungsi untuk menutup modal
  children?: ReactNode; // Konten modal
}

const Modal: React.FC<ModalProps> = ({
  title,
  showModal,
  children,
  handleModal,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed z-99999 inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg w-1/3 p-6">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={() => handleModal(false)}
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
