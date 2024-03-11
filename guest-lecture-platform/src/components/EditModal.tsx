import React, { useState } from 'react';
import Modal from '../components/modal';
import { Lecturer } from '../components/type';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lecturer: Lecturer) => void;
  lecturer: Lecturer | null;
}

const EditModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, lecturer }) => {
  const [formData, setFormData] = useState<Lecturer | null>(lecturer);

  // Ensure formData is set to lecturer when lecturer changes
  React.useEffect(() => {
    setFormData(lecturer);
  }, [lecturer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (formData) {
      onSubmit(formData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      {formData && (
        <div>
          {/* Input fields for editing lecturer details */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input type="text" name="lecturerName" value={formData.lecturerName} onChange={handleChange} className="border rounded-md p-2 w-full" />
          </div>
          {/* Add more input fields for other lecturer details */}
          <button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save Changes
          </button>
        </div>
      )}
    </Modal>
  );
};

export default EditModal;
