import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const AddLecturerModal = () => {
    const [formData, setFormData] = useState({
        facultyName: '',
        phone: '',
        email: '',
        password: '',
        qualifications: {
            ug: false,
            pg: false,
            phd: false
        },
        schoolsDeanery: '',
        department: '',
        subjectName: '',
        yearAndSemester: '',
        sectionsHandled: 0,
        hours: 0,
        startDate: '',
        proposedRate: 0,
        totalAmount: 0,
        accountDetails: {
            accountNumber: '',
            accountHolderName: '',
            bankName: '',
            bankBranch: ''
        },
        panCardNumber: '',
        dept_id: 0,
        dean_id: 0,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            qualifications: {
                ...prevData.qualifications,
                [name]: checked
            }
        }));
    };
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Make sure to format the qualifications field as required by the API
            const qualifications = {
                ug: formData.qualifications.ug,
                pg: formData.qualifications.pg,
                phd: formData.qualifications.phd
            };
    
            // Create the data object to send to the API
            const requestData = {
                facultyName: formData.facultyName,
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
                qualifications: qualifications, // Assign the formatted qualifications object
                schoolsDeanery: formData.schoolsDeanery,
                department: formData.department,
                subjectName: formData.subjectName,
                yearAndSemester: formData.yearAndSemester,
                sectionsHandled: formData.sectionsHandled,
                hours: formData.hours,
                startDate: formData.startDate,
                proposedRate: formData.proposedRate,
                totalAmount: formData.totalAmount,
                accountDetails: formData.accountDetails,
                panCardNumber: formData.panCardNumber,
                dept_id: formData.dept_id,
                dean_id: formData.dean_id
            };
    
            // Make POST request to signupLecturer API
            const response=await axios.post('/api/signupLecturer', requestData);
       
            // Handle any further actions after successful form submission
            console.log(response);
        } catch (error) {
            // Handle error
            if (axios.isAxiosError(error)) {
            console.error('Error submitting form:', error);
        }
     }
    };
    return (
      
        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="facultyName">Faculty Name:</label>
                <input className="border border-gray-600" type="text" id="facultyName" name="facultyName" value={formData.facultyName} onChange={handleChange} required />
            </div> 
            <div>
                <label htmlFor="password">Password:</label>
                <input className="border border-gray-600" type="text" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="phone">Phone Number:</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="qualifications">Qualifications:</label>
                <div>
                    <label htmlFor="ug">UG:</label>
                    <input type="checkbox" id="ug" name="ug" checked={formData.qualifications.ug} onChange={handleCheckboxChange} />
                </div>
                <div>
                    <label htmlFor="pg">PG:</label>
                    <input type="checkbox" id="pg" name="pg" checked={formData.qualifications.pg} onChange={handleCheckboxChange} />
                </div>
                <div>
                    <label htmlFor="phd">PhD:</label>
                    <input type="checkbox" id="phd" name="phd" checked={formData.qualifications.phd} onChange={handleCheckboxChange} />
                </div>
            </div>
            <div>
                <label htmlFor="schoolsDeanery">Schools:</label>
                <input type="text" id="schoolsDeanery" name="schoolsDeanery" value={formData.schoolsDeanery} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="department">Department:</label>
                <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="subjectName">Subject:</label>
                <input type="text" id="subjectName" name="subjectName" value={formData.subjectName} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="yearAndSemester">Semester/Year:</label>
                <input type="text" id="yearAndSemester" name="yearAndSemester" value={formData.yearAndSemester} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="sectionsHandled">Classes:</label>
                <input type="text" id="sectionsHandled" name="sectionsHandled" value={formData.sectionsHandled} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="hours">Hours:</label>
                <input type="text" id="hours" name="hours" value={formData.hours} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="startDate">Start Date:</label>
                <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="proposedRate">Rate:</label>
                <input type="text" id="proposedRate" name="proposedRate" value={formData.proposedRate} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="totalAmount">Amount:</label>
                <input type="text" id="totalAmount" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
            </div>
            <div>
                <label>Account Details</label>
                <label htmlFor="accountNumber">A/C Number:</label>
                <input type="text" id="accountNumber" name="accountNumber" value={formData.accountDetails.accountNumber} onChange={handleChange} required />
                <label htmlFor="accountHolderName">A/C Holder Name:</label>
                <input type="text" id="accountHolderName" name="accountHolderName" value={formData.accountDetails.accountHolderName} onChange={handleChange} required />
                <label htmlFor="bankName">Bank Name:</label>
                <input type="text" id="bankName" name="bankName" value={formData.accountDetails.bankName} onChange={handleChange} required />
                <label htmlFor="bankBranch">Bank Branch:</label>
                <input type="text" id="bankBranch" name="bankBranch" value={formData.accountDetails.bankBranch} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="panCardNumber">PAN Card number:</label>
                <input type="text" id="panCardNumber" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} required />
            </div>
        
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Submit</button>
    </form>
    
    );
};
  
export default AddLecturerModal;