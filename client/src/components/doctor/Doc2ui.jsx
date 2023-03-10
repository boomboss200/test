/** @format */

import { useState } from 'react';
import Styles from './Doc.module.css';
import Doc3ui from './Doc3ui';
import Ghh from '../MainWorks/Ghh';
import { Link } from 'react-router-dom';
import { add } from '../Redux/Actions/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Doc2ui({
  doctor,
  image,
  namee,
  department,
  price,
  Patient_Stories,
  exp,
  host,
  id,
}) {
  const sav = {
    image,
    namee,
    department,
    price,
    Patient_Stories,
    exp,
    host,
    id,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate()

  function tosinglepage() {
    add(dispatch, sav);
  }
  const [btn, setBtn] = useState(false);

  function changeComp() {
    setBtn((prev) => !prev);
  }

  return (
    <>
      <div key={id}
        className={Styles.p2div1}
        style={{
          // paddingLeft: '30px',
          textAlign: 'left',
        }}>
        <div className={Styles.p2div11}>
          <img
            style={{
              marginBottom: '20px',
            }}
            className={Styles.pimg1}
            src={image}
            alt=''
          />
          <div
            onClick={()=> navigate(`/doctor/info-appointment/${doctor._id}`)}
            style={{
              textDecoration: 'none',
              color: 'rgb(55,184,237)',
              cursor: 'pointer',
              fontSize: '18px',
              width: '800px',
              // border: 'solid black',
            }}>
            View Profile
          </div>
        </div>
        <div
          className={Styles.p2div12}
          style={{
            paddingLeft: '60px',
            textAlign: 'left',
          }}>
          <h2>Dr.{doctor.firstName}{doctor.lastName}</h2>
          <h5>{doctor.specialization}</h5>
          <li>
            Experience:<b> {(' ', doctor.experience)} years</b>{' '}
          </li>
          <li></li>
          <li>
            Available Hours : <b> {doctor.timings[0]} - {doctor.timings[1]} </b>
          </li>
          <b>Rs. {doctor.feesPerCunsaltation}</b>
          <button className={Styles.pbtn1}>99%</button>
          <span>
            {' '}
            <li>
              {' '}
              Gender:<b> {doctor.gender} </b>
            </li>{' '}
          </span>
        </div>
        <div className={Styles.p2div13}>
          <button className={Styles.pbtn2} onClick={()=> navigate(`/doctor/book-appointment/${doctor._id}`)}>
            Book Appointment <br /> no fees
          </button>
        </div>
      </div>
      <div className={Styles.p2div14}>{btn ? <Ghh sav={sav} /> : null}</div>
    </>
  );
}
export default Doc2ui;
