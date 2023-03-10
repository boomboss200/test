/** @format */

import { useContext, useEffect, useState } from 'react';
import Gender from '../MainWorks/Gender';
import Loader from '../MainWorks/Loader';
import Pagination from '../MainWorks/Pagination';
import Price from '../MainWorks/Price';
import Doc2ui from '../doctor/Doc2ui';
import axios from "axios"
import AreaofExpertise from '../MainWorks/AreaofExpertise';



function Dashboard() {
  const [data, setData] = useState()
  const [heading, setHeading] = useState("")
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  // const [user, setUser] = useState('');
  const [image, setImage] = useState([]);
  const [error, setError] = useState(false);
  const [gender, setGender] = useState("");
  const [sorting, setSorting] = useState("");
  const [page, setPage] = useState(1);
  const [curr, setCurr] = useState("");
  const [everu, setEveru] = useState([]);

  const GenderFilter = (productItem) =>{
    const result = doctors.filter((currentData)=>{
      return currentData.gender === productItem;
    })
      setEveru(result)
      setHeading(productItem)
  }


  const ExperienceFilter = (productItem) =>{
    const result = doctors.filter((currentData)=>{
      return currentData.experience === productItem;
    })
      setEveru(result)
      setHeading(productItem)
  }

  const SpecializationFIlter = (productItem) =>{
    const result = doctors.filter((currentData)=>{
      return currentData.specialization === productItem;
    })
      setEveru(result)
      setHeading(productItem)
  }


  const Nofilter = () =>{
      setEveru(doctors)
  }


  const [doctors , setDoctors] = useState([])

  
  // doctors data
  const getUserData = async () =>{
    try{
      const res = await axios.get(`/api/v1/user/getAllDoctors`, 
      {
        headers:{
          Authorization : "Bearer " + localStorage.getItem("token"),
        },
      })
      if(res.data.success){
        setDoctors(res.data.data)
        setEveru(res.data.data)
        setLoader(false)
      }
    }catch(error){
      console.log(error)
    }
  }
  
  
  
    useEffect(()=>{
      getUserData();
    }, [])
  


  // if(!curr)
  // setSearch("");

  // let ar = [
  //   'Dentist',
  //   'Gynecologist',
  //   'Dermatologist',
  //   'General Physician',
  //   'Homoeopath',
  //   'Ayurveda',
  //   'Dermatologist',
  // ];
// console.log(data)
  // useEffect(() => {
  //   // if (price && gender)
  //   //   fetching(
  //   //     `http://localhost:8080/doctor?_page=${page}&_limit=5&deparment=${search}&gender=${gender}&_sort=${price}`
  //   //   );
  //   // else if (price)
  //   //   fetching(
  //   //     `http://localhost:8080/doctor?_page=${page}&_limit=5&deparment=${search}&_sort=${price}`
  //   //   );
  //   // else if (gender)
  //   //   fetching(
  //   //     `http://localhost:8080/doctor?_page=${page}&_limit=5&deparment=${search}&gender=${gender}`
  //   //   );
  //   // else
  //   //   fetching(
  //   //     `http://localhost:8080/doctor?_page=${page}&_limit=5&deparment=${search}`
  //   //   );
  //   // setPage(1);
  //   setLoader(true)
  //   getDoctor();
  // }, [gender, sorting, page, search]);

  const changecurr = (e) => {
    // for (let i = 0; i < ar.length; i++) {
    //   if (ar[i] === curr) setSearch(i + 1);
    // }

    setSearch(curr);
    console.log(curr);
  };

  // const fetching = async (value) => {
  //   setLoader(true);
  //   if (+search > 10) setError(true);
  //   let a = await fetch(value);
  //   let b = await a.json();
  //   setData(b);
  //   console.log(b);
  //   let arr = [];
  //   for (let a1 of b) {
  //     let gender = a1.gender == 'Male' ? 'male' : 'female';
  //     console.log(gender);
  //     let req = await fetch(`https://randomuser.me/api/?gender=${gender}`);
  //     let res = await req.json();
  //     // setImage([]);
  //     arr.push(res.results[0].picture.large);
  //   }
  //   if (image.length === 0);
  //   setImage(arr);
  //   console.log(arr);
  //   setLoader(false);
  // };

  //  const call=async(value)=>{
  //   if(value)
  //   fetching(`http://localhost:8080/doctor?_page=1&_limit=5&deparment=${search}${value}`)
  //  }
  const changeGender = (d) => {
    setGender(d);
  };

  const changePrice = (d1) => {
    setSorting(d1);
  };

  const onChange = (v) => {
    setPage(v);
  };

  const increasePage=()=>{
    if(page<5)
    setPage((pre)=>pre+1);
  }

  const decreasePage=()=>{
    if(page>1)
    setPage((pre)=>pre-1);
  }



  async function getDoctor() {
    try {
      let req = await fetch(`https://odd-blue-scarab-kit.cyclic.app/doctor?department=${search}&page=${page}&gender=${gender}&${sorting}`);
      let res = await req.json();
      if (res.error) alert(res.error);
      else {
        setData(res.doctorData);
        setLoader(false)
      }
      // console.log(res);
    } catch (e) {
      alert(e);
    }
  }

  if (error) return <h1 style={{ color: 'red' }}>404 Error</h1>;
  return (
    <div>
      <h1>Search Doctor</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0px 0px 16px 0px',
        }}>
        <div style={{ border: '2px solid grey' }}>
          <span
            class='material-symbols-outlined'
            style={{ padding: '0px', marginTop: '6px', marginRight: '0px' }}>
            search
          </span>
        </div>
        
      </div>
      <div
        style={{
          backgroundColor: '#28328c',
          display: 'flex',
          height: '60px',
          justifyContent: 'space-around',
          marginTop: '32px',
          position: 'fixed',
          width: '100%',
          marginBottom: '20px',
          margin: 'auto',
          position: '-webkit-sticky',
          position: 'sticky',
          top: '0',
          alignItems: 'center',
        }}>
       {/* //gender */}
      
{/* gender filter of doctor  */}

<div class="btn-group">
  <button type="button" class="btn btn-primary">Gender</button>
  <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><button className='dropdown-item' onClick={()=>{Nofilter("all")}}>Any</button></li>
    <li><button className='dropdown-item' onClick={()=>GenderFilter('male')}>Male Doctor</button></li>
    <li><button className='dropdown-item' onClick={()=>GenderFilter('female')}>Female Doctor</button></li>
  </ul>
</div>

{/* specialization filter of doctor  */}

<div class="btn-group">
  <button type="button" class="btn btn-primary">Department</button>
  <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><button className='dropdown-item' onClick={()=>{Nofilter("all")}}>Any</button></li>
    <li><button className='dropdown-item' onClick={()=>SpecializationFIlter('Bones')}>Orthopedic </button></li>
    <li><button className='dropdown-item' onClick={()=>SpecializationFIlter('Dentist')}>Dentist</button></li>
  </ul>
</div>


{/* experinece filter of doctor  */}

<div class="btn-group">
  <button type="button" class="btn btn-primary"> Experience</button>
  <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><button className='dropdown-item' onClick={()=>{Nofilter("all")}}>Any</button></li>
    <li><button className='dropdown-item' onClick={()=>ExperienceFilter('1')}>1 year </button></li>
    <li><button className='dropdown-item' onClick={()=>ExperienceFilter('2')}>2 years</button></li>
    <li><button className='dropdown-item' onClick={()=>ExperienceFilter('3')}> 3 years</button></li>
    <li><button className='dropdown-item' onClick={()=>ExperienceFilter('5')}> 5+ years  </button></li>

  </ul>
</div>


      </div>
      <div
        style={{
          width: '100%',
          paddingLeft: '100px',
          marginTop: '100px',
          border: 'solild black',
        }}>
        {loader ? (
          <Loader />
        ) : (
          everu && everu.map(doctor => {
            return (
              <Doc2ui
                // key={e.id}
                // namee={e.name}
                // department={e.department}
                // gender={e.gender}
                // exp={e.yearexp}
                // price={e.price}
                // image={e.image}
                // Patient_Stories={e.PatientStories}
                // host={e.hospital}
                // id={e.id}
                doctor={doctor}
              />
            );
          })
        )}
      </div>
      <Pagination page={page} onChange={onChange} prev={decreasePage} next={increasePage}/>
    </div>
  );
}

export default Dashboard;
