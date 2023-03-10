/** @format */

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landging_page from '../landging_page/Landing_page';
import Login from '../Log In/Login';
import Signup from '../Log In/Signup';
import Dashboard from '../ProductsPages/Dashboard';
import DocProfile from '../doc_detail_page/DocProfile/DocProfile';
import BookingPage from '../doc_detail_page/DocProfile/BookingPage';
import InfoDoc from '../doc_detail_page/DocProfile/infoDoc';

import Doc4ui from '../doctor/Doc4ui';
import Checkout from '../ProductsPages/Checkout';
import Payment from '../MainWorks/Payment';
import Users from '../admin/Users';
import Doctors from '../admin/Doctors';

import Appointment from '../doc_detail_page/Appointment/Appointment';
import Sidebar from '../doc_detail_page/SideBar/SideBar';
import Pull from '../doc_detail_page/Appointment/Pull';
import Home_page from '../home_page/Home_page';
import ProtectedRoute from '../wrapper/ProtectedRoute';
import PublicRoute from '../wrapper/PublicRoute';
import NAvbar1 from "../Navbar/NAvbar";
import NAvbar2 from "../NavBar2/NAvbar2";
import NotificationPage from '../notification/NotificationPage';
import Appointments from '../appointment_page/Appointments';
import DoctorAppointments from '../appointment_page/DoctorAppointments';
import AppleDoctor from '../apply_doctor_page/ApplyDoctor';
import DocUpProfile from '../doc_detail_page/DocProfile/UpdateProfile';

const Allroute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PublicRoute> <NAvbar1/> <Landging_page /> </PublicRoute>} />
        <Route path='/homepage' element={<ProtectedRoute> <NAvbar2/> <Home_page /> </ProtectedRoute>} />
        <Route path='/login' element={<PublicRoute> <NAvbar1/> <Login /> </PublicRoute>} />
        <Route path='/signup' element={<PublicRoute> <NAvbar1/> <Signup /></PublicRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute> <NAvbar2/><Dashboard /> </ProtectedRoute>} />
        <Route path='/notification' element={<ProtectedRoute> <NAvbar2/> <NotificationPage /></ProtectedRoute>} />
        <Route path='/appointments' element={<ProtectedRoute> <NAvbar2/> <Appointments /></ProtectedRoute>} />
        <Route path='/doctor-appointments' element={<ProtectedRoute> <NAvbar2/> <DoctorAppointments /></ProtectedRoute>} />
        <Route path='/apply-doctor' element={<ProtectedRoute> <NAvbar2/> <AppleDoctor /></ProtectedRoute>} />
        <Route path='/doctor/profile/:id' element={<ProtectedRoute> <NAvbar2/> <DocUpProfile /></ProtectedRoute>} />
        <Route path='/doctor/book-appointment/:doctorId' element={<ProtectedRoute> <NAvbar2/> <BookingPage /></ProtectedRoute>} />
        <Route path='/doctor/info-appointment/:doctorId' element={<ProtectedRoute> <NAvbar2/> <InfoDoc /></ProtectedRoute>} />
        <Route path='/admin/users' element={<ProtectedRoute> <NAvbar2/> <Users /></ProtectedRoute>} />
        <Route path='/admin/doctors' element={<ProtectedRoute> <NAvbar2/> <Doctors /></ProtectedRoute>} />

        <Route path='/single' element={<DocProfile />} />
        <Route path='/booking' element={<Doc4ui />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/user' element={<Pull />} />
        {/* <Route path='/side' element={<Sidebar />} /> */}
        {/* Side bar */}
      </Routes>
    </div>
  );
};

export default Allroute;
