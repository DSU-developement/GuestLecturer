// details.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { Lecturer } from '../components/type';

const DetailsPage: React.FC<{ data: Lecturer[] }> = ({ data }) => {
  const { id } = useParams<{ id: string }>(); // Get the id parameter from the URL

  // Find the lecturer with the matching id
  const lecturer = data.find(lecturer => lecturer.key.toString() === id);

  if (!lecturer) {
    return <div>Lecturer not found!</div>;
  }

  return (
    <div>
      <h1>{lecturer.lecturerName}</h1>
      <p>Status: {lecturer.status}</p>
      {/* Render other details of the lecturer as needed */}
    </div>
  );
};

export default DetailsPage;
