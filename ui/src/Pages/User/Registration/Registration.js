import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { loginUser, numberCheck, passwordUpdate, registerUser } from '../../../api/user';
import "./Registration.css";
import { v4 as uuidv4 } from 'uuid';

const Registration = (props) => {
    const navigate = useNavigate();

    const loginShowClose = () => {
        props.setLoginShow(false);
    }

    const [userMobile, setUserMobile] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [otpValue, setOtpValue] = useState("");
    const [otpWrong, setOtpWrong] = useState(false);
    const [validLogin, setValidLogin] = useState(false);
    const [otpShow, setOtpShow] = useState("");
    const [numberValue, setNumberValue] = useState(false);
    // new method
    const [numberValidCheck, setNumberValidCheck] = useState(true);
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [profileInfo, setProfileInfo] = useState(false);
    const [otpCheck, setOtpCheck] = useState(false);
    const [forgetOtp, setForgetOtp] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [imageKey, setImageKey] = useState("");
    const [name, setName] = useState("");
    const [newPass, setNewPass] = useState("");
    const [fillUp, setFillUp] = useState(false);


    function generateRandomNumber() {
        const min = 10000;
        const max = 99999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [file, setFile] = useState();
 
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        setImageKey(e.target.files[0])
    }

    const handleShow = () => {
        if (userMobile.length === 0) {
            setNumberValue(true);
        } else {
            numberCheck(userMobile).then((data) => {
                if (data.exists === true) {
                    setNumberValidCheck(false);
                    setPasswordCheck(true);
                } else {
                    setNumberValidCheck(false);
                    setProfileInfo(true);
                }
            });
        }
    };

    const otpSave = () => {
        if (String(otpCode) === otpValue) {
            setOtpWrong(false);
            loginSave();
        } else {
            setOtpWrong(true);
        }
    };

    const loginSave = () => {

        const formData = new FormData();
        formData.append('image', imageKey);
        formData.append('mobile', userMobile);
        formData.append('password', userPassword);
        formData.append('user_name', name);
        console.log('registration',formData);
        registerUser(formData).then((data) => {
            if (!data.error) {
                localStorage.setItem("niomit", JSON.stringify(data));
                props.setLoginShow(false);
                return navigate("/dashboard");
            }
        });
    };

    const handleMobile = (event) => {
        const value = event.target.value;
        setUserMobile(value);
    };
    const handlePass = (event) => {
        const value = event.target.value;
        setUserPassword(value);
    };
    const handleOtp = (event) => {
        const value = event.target.value;
        setOtpValue(value);
    };

    const loginApi = () => {
        loginUser(userMobile, userPassword).then((data) => {
            if (!data.error) {
                localStorage.setItem("niomit", JSON.stringify(data));
                props.setLoginShow(false);
                return navigate("/dashboard");
            } else {
                setValidLogin(true);
            }
        });
    };

    const profileApi = () => {
        if (name.length > 0 && userPassword.length > 0 && imageKey) {
            const randomNumber = generateRandomNumber();
            setOtpShow(randomNumber);
            setOtpCode(randomNumber);
            setProfileInfo(false);
            setOtpCheck(true);
            setFillUp(false);
        }
        else {
            setFillUp(true);
        }

    }
    const profileBackApi = () => {
        setProfileInfo(false);
        setNumberValidCheck(true);
    }

    const forgetCheck = () => {
        const randomNumber = generateRandomNumber();
        setOtpShow(randomNumber);
        setOtpCode(randomNumber);
        setForgetOtp(true);
        setPasswordCheck(false);
    }

    const forgetOtpCheck = () => {
        if (String(otpCode) === otpValue) {
            setForgetOtp(false);
            setNewPassword(true);
            setOtpWrong(false);
        } else {
            setOtpWrong(true);
        }
    }

    const newPasswordApi = () => {
        passwordUpdate(userMobile, newPass).then((data) => {
            if (!data.error) {
                localStorage.setItem("niomit", JSON.stringify(data));
                props.setLoginShow(false);
                return navigate("/my-course");
            }
        });
    }


    return (
        <>
            <Modal show={props.loginShow} onHide={loginShowClose} centered className="loginModal">
                <Modal.Body>
                    <section className="loginBox">
                        <button className="loginClose" onClick={loginShowClose}><FontAwesomeIcon icon={faClose} /></button>
                        {/* number mobile password */}
                        {numberValidCheck ? <>
                            <div className="loginApp">
                                <>
                                    <div className="inputs">
                                        <input
                                            type="text"
                                            onChange={handleMobile}
                                            value={userMobile}
                                            placeholder="Mobile number"
                                        />
                                        {numberValue ? <span>Enter valid number</span> : <></>}
                                    </div>
                                </>
                                <div className="loginFooter">
                                    <button onClick={handleShow}>Next</button>
                                </div>
                            </div>
                        </> : <></>}
                        {/* Login password */}
                        {passwordCheck ? <>
                            <div className="loginApp flex-column">

                                <input type="password" onChange={handlePass} name="" placeholder="password" />

                                {validLogin ? <p className="text-danger">Invalid information</p> : ""}

                                <div className="loginFooter">
                                    <button onClick={loginApi}>Login</button>
                                </div>

                                <button className="btn" onClick={forgetCheck}>Forget password</button>
                            </div>
                        </> : <></>}
                        {/* profile add */}
                        {profileInfo ? <>
                            <div className="loginApp">
                                <h1 style={{ fontSize: "32px" }}>Profile</h1>
                                <div className="inputs">

                                    <div className="text-center imgFile">{file && file.length > 0 ? <img src={file} alt="shop" /> : ""}</div>

                                    <div className='inputImgField'>
                                        <input type="file" name="file" id="file" onChange={handleChange} className="inputFile" />
                                        <label for="file"><FontAwesomeIcon icon={faPlus} /> Choose a file</label>
                                    </div>

                                    <input type="text" name="userName" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />

                                    <input type="password" name="password" onChange={handlePass} placeholder="Enter your password" />

                                    {fillUp && fillUp ? <p className="text-center text-danger text-bold">Please fillup all the information</p> : ""}
                                    
                                    <div className="profileFooter">
                                    <button onClick={profileBackApi}>Back</button>
                                        <button onClick={profileApi}>Continue</button>
                                    </div>

                                </div>
                            </div>
                        </> : <></>}
                        {/* OTP code */}
                        {otpCheck ? <>
                            <div className="loginApp">
                               
                                <input
                                    type="text"
                                    onChange={handleOtp}
                                    placeholder="OTP number"
                                />
                                <br />
                                <span>{otpShow}</span> <br />
                                {otpWrong ? (
                                    <>
                                        <span className="text-danger">This code is not correct</span>
                                    </>
                                ) : (
                                    <></>
                                )}
                                <br />
                                <div className="loginFooter">
                                    <button onClick={otpSave}>Login</button>
                                </div>
                            </div>
                        </> : <></>}
                        {/* forget OTP code */}
                        {forgetOtp ? <>
                            <div className="loginApp">
                                <input
                                    type="text"
                                    onChange={handleOtp}
                                    placeholder="OTP number"
                                />
                                <br />
                                <span>{otpShow}</span> <br />
                                {otpWrong ? (
                                    <>
                                        <span>This code is not correct</span>
                                    </>
                                ) : (
                                    <></>
                                )}
                                <br />
                                <div className="loginFooter">
                                    <button onClick={forgetOtpCheck}>Login</button>
                                </div>
                            </div>
                        </> : <></>}
                        {/* new password save */}
                        {newPassword ? <>
                            <div className="loginApp">
                                <input
                                    type="password"
                                    onChange={(e) => setNewPass(e.target.value)}
                                    placeholder="Enter your password"
                                />
                                <br />
                                <div className="loginFooter">
                                    <button onClick={newPasswordApi}>Login</button>
                                </div>
                            </div>
                        </> : <></>}
                    </section>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Registration