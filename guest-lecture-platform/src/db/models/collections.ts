export  interface GuestLecturer {
    id: number;
    LecturerName: string;
    Approved: boolean;
    Department_id: number;
    email: string;
    password: string;
    PhoneNo: number;
    Quallifications: string;
    Sem_year:string;
    
  }
  
  export interface HOD {
    id: number;
    name: string;
    deptid: number;
    deptName: string;
    SchoolID: number;
    email: string;
    password: string;
  }
  
  export interface Dean {
    id: number;
    name: string;
    SchoolD: number;
    SchoolName: string;
    Email: string;
    password: string;
  }
  
  export interface ApprovalFlow {
    id: number;
    guestID: number;
    HODid: number;
    HODApproval: boolean;
    DeanID: number;
    DeanApproval: boolean;
  }
