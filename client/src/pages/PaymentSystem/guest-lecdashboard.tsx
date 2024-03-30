import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/SideBar';
import Header from '../../components/CommonHeader';

const GuestDash: React.FC = () => {
    return (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1">
            <Header />
            </div>
            </div>
    );
}
export default GuestDash;