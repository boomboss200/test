import React, { useState } from "react";
//import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { json, NavLink } from "react-router-dom";
import {Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { add3, Authaction } from "../Redux/Actions/actions";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import {showLoading, hideLoading} from "../Redux/features/alertSlice"
import axios from "axios"
import { Form, message, Input } from "antd"

const Login = () => {
  const history = useNavigate();
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const token = useSelector((store) => {
    return store.token;
  });

  const [tick, setTick] = useState(false);
  const [data, setData] = useState([]);
  // console.log(inpval);

  const getdata = async (e) => {
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
  const dispatch = useDispatch();
  const addData = (e) => {
    e.preventDefault();
    let { email, password } = inpval;
    findUser({ email, password });
  };
  async function findUser(data) {
    try {
      let req = await fetch(
        `https://odd-blue-scarab-kit.cyclic.app/signUp/logIn`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      let res = await req.json();
      if (res.error)
        toast.error(res.error, {
          position: "top-center",
        });
      else {
        alert(res.message);
        await add3(dispatch, res.data);
        history("/");
        // console.log(res);
      }
      // history("/");
      // alert(res.message);
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
     const res = await axios.post("/api/v1/user/login", values)
     dispatch(hideLoading())
     if(res.data.success){
       localStorage.setItem("token", res.data.token)
       message.success("Login successfully")
       navigate("/")
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
        <div className="log-App">
          <div className="loginn">
            <div id="log-design">
              <NavLink className="log" to="/Login">
                Login
              </NavLink>
            </div>
            <div id="sign-design">
              <NavLink className="sign" to="/Signup">
                Register
              </NavLink>
            </div>
          </div>
          <hr className="lines"></hr>
          <div className="contain">
            <div className="picc">
              <img
                className="logos"
                src="https://accounts.practo.com/static/images/illustration.png"
              ></img>
            </div>

            <div className="info">
            <Form 
              layout='vertical' 
              onFinish={onFinishHandler} 
              className="register-form">
            <h3 className="text-center">Enter Details</h3>

            <Form.Item label="Email" name="email"> 
                <Input type="email" required />
            </Form.Item>

            <Form.Item label="Password" name="password"> 
                <Input type="password" required />
            </Form.Item>
           {/* <Link to="/register" className="m-2">New User go to Register</Link> */}
            <button className="btn btn-primary" type="submit"> Login </button>
            <p id="parag">
                  Don't Have an Account{" "}
                  <span>
                    <NavLink id="links" to="/Signup">
                      Register
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

export default Login;
