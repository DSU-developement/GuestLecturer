// connections.ts
import { MongoClient, Db, Collection } from 'mongodb';
import {
  GuestLecturer,
  HOD,
  Dean,
  ApprovalFlow,
} from './models/collections';

let database: Db;

export async function connectToDatabase() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    database = client.db('GuestLecturer');
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

export function getGuestLecturerCollection(): Collection<GuestLecturer> {
  return database.collection<GuestLecturer>('GuestLecturer');
}

export function getHODCollection(): Collection<HOD> {
  return database.collection<HOD>('HOD');
}

export function getDeanCollection(): Collection<Dean> {
  return database.collection<Dean>('Dean');
}

export function getApprovalFlowCollection(): Collection<ApprovalFlow> {
  return database.collection<ApprovalFlow>('ApprovalFlow');
}
