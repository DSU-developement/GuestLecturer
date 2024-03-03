import React, { useState } from 'react';
import Table from '../components/table';
import { FaEdit } from "react-icons/fa";
import Button from '../components/button';
import Teacher from '../components/teacher/lecturer';

type Props = {};

interface DataType {
  key: React.Key;
  lecturerName: string;
  lecturerPhoneNumber: string;
  lecturerEmail: string;
  lecturerSchools: string;
  lecturerDept: string;
  lecturerSubject: string;
  lecturerSem_year: string;
  lecturerClasses: string;
  lecturerHours: string;
  lecturerRate: string;
  lecturerAmount: string;
  lecturerRemarks: string;
  status: string;
  lecturerDob: string,
  lecturerQulifications: string,
}

const Lecturer = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<DataType | undefined>(undefined)
  const [formData, setFormData] = useState<Partial<DataType>>({
    lecturerName: "",
    lecturerPhoneNumber: "",
    lecturerEmail: "",
    lecturerQulifications: "",
    lecturerSchools: "",
    lecturerDept: "",
    lecturerSubject: "",
    lecturerSem_year: "",
    lecturerClasses: "",
    lecturerHours: "",
    lecturerRate: "",
    lecturerAmount: "",
    lecturerRemarks: "",
    status: "",
  });

  const onClickOk = () => {
    console.log('Ok clicked');
    setIsModalOpen(false);
    console.log('Form data:', formData);
    setFormData({
      lecturerName: "",
      lecturerPhoneNumber: "",
      lecturerEmail: "",
      lecturerQulifications: "",
      lecturerSchools: "",
      lecturerDept: "",
      lecturerSubject: "",
      lecturerSem_year: "",
      lecturerClasses: "",
      lecturerHours: "",
      lecturerRate: "",
      lecturerAmount: "",
      lecturerRemarks: "",
      status: "",
    });
  };

  const onClickClose = () => {
    console.log('Close clicked');
    setIsModalOpen(false);
    setSelectedClass(undefined);
  };

  const onClickAddClassButton = () => {
    setIsModalOpen(true);
  };
  const handleEditClick = (classData:DataType) =>{
    setIsModalOpen(true);
    setSelectedClass(classData);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dataSource = [
    {
      key: "1",
      lecturerName: "ABC",
      lecturerPhoneNumber: "1234567890",
      lecturerEmail: "abc@def.com",
      lecturerQulifications: "M.Tech",
      lecturerSchools: "Engineering",
      lecturerDept: "CSE",
      lecturerSubject: "Cloud Computing",
      lecturerSem_year: "6,3",
      lecturerClasses: "D",
      lecturerHours: "4",
      lecturerRate: "500",
      lecturerAmount: "50000",
      lecturerRemarks: "...",
      status: "Accepted",
    },
  ];

  const columns = [
    {
      title: 'Lecturer ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: "Name",
      dataIndex: "lecturerName",
      key: "key",
    },
    {
      title: "Phone number",
      dataIndex: "lecturerPhoneNumber",
      key: "key",
    },
    {
      title: "Email",
      dataIndex: "lecturerEmail",
      key: "key",
    },
    {
      title: "Qualifications",
      dataIndex: "lecturerQulifications",
      key: "key",
    },
    {
      title: "Schools",
      dataIndex: "lecturerSchools",
      key: "key",
    },
    {
      title: "Department",
      dataIndex: "lecturerDept",
      key: "key",
    },
    {
      title: "Subject",
      dataIndex: "lecturerSubject",
      key: "key",
    },
    {
      title: "Sem/Year",
      dataIndex: "lecturerSem_year",
      key: "key",
    },
    {
      title: "Classes",
      dataIndex: "lecturerClasses",
      key: "key",
    },
    {
      title: "Hours",
      dataIndex: "lecturerHours",
      key: "key",
    },
    {
      title: "Rate",
      dataIndex: "lecturerRate",
      key: "key",
    },
    {
      title: "Amount",
      dataIndex: "lecturerAmount",
      key: "key",
    },
    {
      title: "Remarks",
      dataIndex: "lecturerRemarks",
      key: "key",
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (d: any) => (
        <div>
          <Button state="success" className="border-0">
            <div className="flex gap-2 items-center">Accepted</div>
          </Button>
        </div>
      ),
    },
    {
      title: 'Action',
      render: (d: any) => (
        <div>
          <Button state='ghost' onClick={()=>handleEditClick(d)}>
          <FaEdit />
          </Button>
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
  };

  return (
    <div>
      <div className="mt-6">
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
      <Teacher
        isOpen={isModalOpen}
        onClose={onClickClose}
        onSubmit={onClickOk}
        classData={selectedClass}
      />
    </div>
  );
};

export default Lecturer;