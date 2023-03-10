/** @format */

import React, { useState } from "react";
//import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import {showLoading, hideLoading} from "../Redux/features/alertSlice"
import axios from "axios"
import { Form, message, Input } from "antd"
import {useDispatch} from "react-redux"


const Signup = () => {
  const history = useNavigate();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [tick, setTick] = useState(false);

  const [data, setData] = useState([]);
  // console.log(inpval);

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = async (e) => {
    e.preventDefault();

    const { name, email, password } = inpval;
    await addUser({ name, email, password });
    // if (name === "") {
    //   toast.error(" Name field is requred!", {
    //     position: "top-center",
    //   });
    // } else if (email === "") {
    //   toast.error("email field is requred", {
    //     position: "top-center",
    //   });
    // } else if (password === "") {
    //   toast.error("Password field is requred", {
    //     position: "top-center",
    //   });
    // } else {
    // console.log("Signup Succesfully");
    // addUser(name,);
    // alert("Signup Successfull");
    // history("/login");
    // localStorage.setItem('user', JSON.stringify([...data, inpval]));
    // }
  };

  async function addUser(data) {
    try {
      let req = await fetch(`https://odd-blue-scarab-kit.cyclic.app/signUp`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      let res = await req.json();
      // console.log(res);
      if (res.error)
        toast.error(res.error, {
          position: "top-center",
        });
      else if (res.message) {
        // toast.success(res.message, {
        //   position: "top-center",
        // });
        toast.success(res.message, {
          position: "top-center",
        });
        alert("Signup Successfull");
        history("/login");
        // setLocation(true);
      }
      // alert("Signup Successfull");
    } catch (e) {
      toast.error(e, {
        position: "top-center",
      });
    }
  }

  function check(e) {
    let { value, checked } = e.target;
    checked ? setTick(true) : setTick(false);
  }


  const onFinishHandler = async(values) => {
    try{
        dispatch(showLoading())
        const res = await axios.post("/api/v1/user/register", values)
        dispatch(hideLoading())
        if(res.data.success){
            message.success("Registered successfully")
            navigate("/login")
        }else{
            message.error(res.data.message)
        }
    }catch(error){
        dispatch(hideLoading())
        console.log(error)
        message.error("Something went wrong")
    }
}

  return (
    <>
      <section>
        <div className="Appss">
          <div className="signupp">
            <div id="log-designs">
              <NavLink className="logs" to="/Login">
                Login
              </NavLink>
            </div>

            <div id="sign-designs">
              <NavLink className="signs" to="/Signup">
                Register
              </NavLink>
            </div>
          </div>
          <hr className="lines"></hr>
          <div className="contain">
            <div className="piccs">
              <img
                className="logos"
                src="https://accounts.practo.com/static/images/illustration.png"
              ></img>
            </div>

            <div className="infos">
            <Form layout='vertical' onFinish={onFinishHandler} className="register-form">
            <h3 className="text-center">Register Form</h3>

            <Form.Item label="Name" name="name"> 
                <Input type="text" required />
            </Form.Item>

            <Form.Item label="Email" name="email"> 
                <Input type="email" required />
            </Form.Item>

            <Form.Item label="Password" name="password"> 
                <Input type="password" required />
            </Form.Item>
            {/* <Link to="/login" className="m-2">Already user go to Login</Link> */}
            <button className="btn btn-primary" type="submit"> Register </button>
            <p id="parags">
                  Already Have an Account{" "}
                  <span>
                    <NavLink id="linkss" to="/Login">
                      Login
                    </NavLink>
                  </span>{" "}
                </p>
             </Form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
