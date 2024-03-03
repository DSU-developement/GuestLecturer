// src/db/db.ts
import { connectToDatabase, getGuestLecturerCollection, getHODCollection, getDeanCollection, getApprovalFlowCollection } from './connections';
import { GuestLecturer, HOD, Dean, ApprovalFlow } from './models/collections';

export async function exampleUsage() {
  await connectToDatabase();

  const guestLecturerCollection = getGuestLecturerCollection();
  const hodCollection = getHODCollection();
  const deanCollection = getDeanCollection();
  const approvalFlowCollection = getApprovalFlowCollection();
  
//   return(
//      <div> hodCollection </div>
//   )
  // Example: Use these collections as needed
}
