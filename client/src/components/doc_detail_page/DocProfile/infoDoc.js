import React, { useEffect, useState } from 'react'
import axios from "axios"
import Styles from '../../doctor/Doc.module.css';

import { useParams } from 'react-router-dom'
import { DatePicker, TimePicker } from 'antd'
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import {showLoading, hideLoading} from "../../Redux/features/alertSlice"
import { message } from 'antd'
import styles from './DocProfile.module.css';
import { useNavigate } from 'react-router-dom'

const InfoDoc = () => {
    
  const navigate = useNavigate()
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const params = useParams()
    const [doctors , setDoctors] = useState([])
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [isAvailable, setIsAvailable] = useState()

    // doctors data
    const getDoctorData = async () =>{
      try{
        const res = await axios.post("/api/v1/doctor/getDoctorbyId", 
        {doctorId: params.doctorId},
        {
          headers:{
            Authorization : "Bearer " + localStorage.getItem("token"),
          },
        })
        if(res.data.success){
          setDoctors(res.data.data)
        }
      }catch(error){
        console.log(error)
      }
    }

    // ============ handle availiblity
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };


    const handleBooking = async () => {
        try {
            setIsAvailable(true);
            if (!date && !time) {
                return alert("Date & Time Required");
            }
          dispatch(showLoading());
          const res = await axios.post(
            "/api/v1/user/book-appointment",
            {
              doctorId: params.doctorId,
              userId: user._id,
              doctorInfo: doctors,
              userInfo: user,
              date: date,
              time: time,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (res.data.success) {
            message.success(res.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
        }
      };


      useEffect(()=>{
        getDoctorData();
      }, [])    



  return (
    <>
      <div className={styles.tab_data}>
        <div className={styles.flexBox}>
          <h1>  A little Bio About doctor </h1>
            <div className="container">
              {doctors && (
                <>
                <div className={styles.contprofileinfo}>
                  <div
                    className={styles.divprofileinfo}
                    style={{
                      textAlign: 'left',
                      marginBottom: '50px',
                    }}>
                    <h4>
                         Dr. {doctors.firstName} {doctors.lastName}
                    </h4>
                    <h4>
                        Fees: {doctors.feesPerCunsaltation}
                    </h4>
                    <h4>
                        Available Timings: {doctors.timings?.[0]} - {doctors.timings?.[1]}
                    </h4>
                    </div>
                  <div
                    style={{
                      marginBottom: '50px',
                    }}>
              <p
              style={{
                textAlign: 'left',
              }}>
             {doctors.bio}
            </p>
          </div>

          </div>
   
                {/* //     <div className="d-flex flex-column">
                //         <DatePicker 
                //         className="m-2"
                //         format="DD-MM-YYYY"
                //             onChange={(value) => {
                //             setDate((value).format("DD-MM-YYYY"))
                //           }
                //         }
                //         />
                //         <TimePicker
                //         className="m-2"
                //         format="HH:mm"
                //         onChange={(value) => {
                //             setTime((value).format("HH:mm"));
                //         }}
                //         />
                //         <button className="btn btn-primary mt-2"
                //         onClick={handleAvailability}
                //         > Check Availability</button>
                //         <button className="btn btn-dark mt-2" onClick={handleBooking} >
                //             Book Now
                //         </button>
                //     </div>
                // </div>
                

// </> */}
        </>                

)}

      <div className={Styles.p2div13}>
          <button className={Styles.pbtn2} onClick={()=> navigate(`/doctor/book-appointment/${doctors._id}`)}>
            Book Appointment <br /> no fees
          </button>
        </div>
              </div>
              </div>
            </div>
        
    </>
  )
}

export default InfoDoc