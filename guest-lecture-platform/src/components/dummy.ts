// dummyData.ts

export interface Lecturer {
    key: number;
    lecturerName: string;
    lecturerPhoneNumber: string;
    lecturerEmail: string;
    lecturerQualifications: string;
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
  }
  
  export const lecturersData: Lecturer[] = [
    {
      key: 1,
      lecturerName: "John Doe",
      lecturerPhoneNumber: "123-456-7890",
      lecturerEmail: "john.doe@example.com",
      lecturerQualifications: "Ph.D. in Computer Science",
      lecturerSchools: "School of Engineering",
      lecturerDept: "Computer Science",
      lecturerSubject: "Software Engineering",
      lecturerSem_year: "Spring 2024",
      lecturerClasses: "CS101, CS201",
      lecturerHours: "20",
      lecturerRate: "$50",
      lecturerAmount: "$1000",
      lecturerRemarks: "",
      status: "Pending"
    },
    {
      key: 2,
      lecturerName: "Jane Smith",
      lecturerPhoneNumber: "987-654-3210",
      lecturerEmail: "jane.smith@example.com",
      lecturerQualifications: "M.Sc. in Physics",
      lecturerSchools: "School of Science",
      lecturerDept: "Physics",
      lecturerSubject: "Quantum Mechanics",
      lecturerSem_year: "Fall 2023",
      lecturerClasses: "PHY301",
      lecturerHours: "15",
      lecturerRate: "$40",
      lecturerAmount: "$600",
      lecturerRemarks: "",
      status: "Accepted"
    },
    // Add more dummy data as needed
  ];
  