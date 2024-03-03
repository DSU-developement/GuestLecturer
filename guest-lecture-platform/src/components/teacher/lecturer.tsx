import React, { useEffect, useState } from 'react';
import Modal from '../modal';
import Input from '../input';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  classData: any;
}

const ClassModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, classData }) => {
  const [formData, setFormData] = React.useState({
    classId: '',
    className: '',
    division: '',
    status: '',
    statusDate: '',
    lecturerName: '',
    lecturerPhoneNumber: '',
    lecturerEmail: '',
    lecturerQulifications: '',
    lecturerSchools: '',
    lecturerDept: '',
    lecturerSubject: '',
    lecturerSem_year: '',
    lecturerClasses: '',
    lecturerHours: '',
    lecturerRate: '',
    lecturerAmount: '',
    lecturerRemarks: '',
  });

  const [isEdit , setIsEdit] = useState<Boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (classData) {
      setFormData({ ...classData });
      setIsEdit(true);
    }
  }, [classData]);

  const clearModal = () => {
    setFormData({
      classId: '',
      className: '',
      division: '',
      status: '',
      statusDate: '',
      lecturerName: '',
      lecturerPhoneNumber: '',
      lecturerEmail: '',
      lecturerQulifications: '',
      lecturerSchools: '',
      lecturerDept: '',
      lecturerSubject: '',
      lecturerSem_year: '',
      lecturerClasses: '',
      lecturerHours: '',
      lecturerRate: '',
      lecturerAmount: '',
      lecturerRemarks: '',
    });
    setIsEdit(false);
  }

  const handleCloseModal = () => {
    clearModal();
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      onSubmit={onSubmit}
      title={(isEdit ? 'Edit' : 'Add')+ ' Class'}
      children={
        <div>
          <div className="pb-3">
            <Input
              placeholder="001"
              name="classId"
              value={formData.classId}
              onChange={handleChange}
              label='Class ID'
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Class 1"
              name="className"
              value={formData.className}
              onChange={handleChange}
              label='Class Name'
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="A"
              name="division"
              value={formData.division}
              onChange={handleChange}
              label='Division'
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Active"
              name="status"
              value={formData.status}
              onChange={handleChange}
              label='Status'
            />
          </div>
          <div className="pb-3">
            <Input
              type="date"
              placeholder="5th Jan 2023"
              name="statusDate"
              value={formData.statusDate}
              onChange={handleChange}
              label='Status Date'
            />
          </div>
          {/* Lecturer Fields */}
          <div className="pb-3">
            <Input
              placeholder="Lecturer Name"
              name="lecturerName"
              value={formData.lecturerName}
              onChange={handleChange}
              label="Lecturer Name"
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Lecturer Phone Number"
              name="lecturerPhoneNumber"
              value={formData.lecturerPhoneNumber}
              onChange={handleChange}
              label="Lecturer Phone Number"
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Lecturer Email"
              name="lecturerEmail"
              value={formData.lecturerEmail}
              onChange={handleChange}
              label="Lecturer Email"
            />
          </div>
          <div className="pb-3">
          </div>
          <div className="pb-3">
            <Input
              placeholder="Lecturer Schools"
              name="lecturerSchools"
              value={formData.lecturerSchools}
              onChange={handleChange}
              label="Lecturer Schools"
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Lecturer Department"
              name="lecturerDept"
              value={formData.lecturerDept}
              onChange={handleChange}
              label="Lecturer Department"
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Lecturer Subject"
              name="lecturerSubject"
              value={formData.lecturerSubject}
              onChange={handleChange}
              label="Lecturer Subject"
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Lecturer Semester/Year"
              name="lecturerSem_year"
              value={formData.lecturerSem_year}
              onChange={handleChange}
              label="Lecturer Semester/Year"
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Lecturer Classes"
              name="lecturerClasses"
              value={formData.lecturerClasses}
              onChange={handleChange}
              label="Lecturer Classes"
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Lecturer Hours"
              name="lecturerHours"
              value={formData.lecturerHours}
              onChange={handleChange}
              label="Lecturer Hours"
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Lecturer Rate"
              name="lecturerRate"
              value={formData.lecturerRate}
              onChange={handleChange}
              label="Lecturer Rate"
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Lecturer Amount"
              name="lecturerAmount"
              value={formData.lecturerAmount}
              onChange={handleChange}
              label="Lecturer Amount"
            />
          </div>
          <div className="pb-3">
            <Input
              placeholder="Lecturer Remarks"
              name="lecturerRemarks"
              value={formData.lecturerRemarks}
              onChange={handleChange}
              label="Lecturer Remarks"
            />
          </div>
        </div>
      }
    />
  );
};

export default ClassModal;
