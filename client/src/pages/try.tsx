import React from 'react';
import { useParams } from 'react-router-dom';

interface UserDetails {
  username: string;
  email: string;
}

const UserDetailsPage: React.FC<{ userDetails: UserDetails }> = ({ userDetails }) => {
  const { username } = useParams<{ username: string }>();
  console.log(userDetails);

  return (
    <div>
        
    </div>
  );
};

export default UserDetailsPage;
