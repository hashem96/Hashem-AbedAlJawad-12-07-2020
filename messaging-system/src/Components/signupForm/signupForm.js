import React, { useState, Fragment } from 'react'
import './signupForm.css'
import { db, auth } from '../../Firebase/firebase'

const SignupForm = () => {

    const [signUpInputs, setSignUpInputs] = useState({})
    const [error, setError] = useState("");
    const [checkError, setCheckError] = useState(false);

    const handleChange = (e) => {

        setSignUpInputs({ ...signUpInputs, [e.target.id]: e.target.value })

    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        //password and confirm password validation
        if (signUpInputs.password !== signUpInputs.confirmPassword) {
            setCheckError(true);
            setError("Password and confirm password do not match");

        } else {

            //update state
            setSignUpInputs(signUpInputs);


            //Insert user into firestore
            try {
                const cred = await auth.createUserWithEmailAndPassword(
                    signUpInputs.email,
                    signUpInputs.password
                );
                //storing the logged in user's id into localStorage variable
                localStorage.setItem("userid", cred.user.uid);

                // Remove password and confirm password from the database as they will be stored in the auth of Firebase 
                //(password will be hashed according to firebase algorithm)

                delete signUpInputs.password
                delete signUpInputs.confirmPassword

                await db.collection("users").doc(cred.user.uid).set(signUpInputs);


                //Redirect to Dashboard after registration
                window.location.href = "/dashboard";

            //Check if there is error with password weakness , etc (Errors are provided by firebase as well)
            } catch (err) {
                setCheckError(true);
                setError(err.message);
            }

        }

    }


    return (

        <div class="container">
            <h1 id="signUpHeader">Create an Account</h1>
            <div class="row py-5 mt-4 align-items-center">

                {/* <!-- Registeration Form --> */}
                <div>
                    <form onSubmit={handleSubmit}>
                        <div class="row">

                            {/* <!-- First Name --> */}
                            <div class="input-group col-lg-6 mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <i class="fa fa-user text-muted"></i>
                                    </span>
                                </div>
                                <input id="firstName"
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    class="form-control bg-white border-left-0 border-md"
                                    onChange={handleChange}
                                    required />
                            </div>

                            {/* <!-- Last Name --> */}
                            <div class="input-group col-lg-6 mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <i class="fa fa-user text-muted"></i>
                                    </span>
                                </div>
                                <input id="lastName"
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    class="form-control bg-white border-left-0 border-md"
                                    onChange={handleChange}
                                    required />
                            </div>

                            {/* <!-- Email Address --> */}
                            <div class="input-group col-lg-12 mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <i class="fa fa-envelope text-muted"></i>
                                    </span>
                                </div>
                                <input id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    class="form-control bg-white border-left-0 border-md"
                                    onChange={handleChange}
                                    required />
                            </div>


                            {/* <!-- Password --> */}
                            <div class="input-group col-lg-6 mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <i class="fa fa-lock text-muted"></i>
                                    </span>
                                </div>
                                <input id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    class="form-control bg-white border-left-0 border-md"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* <!-- Password Confirmation --> */}
                            <div class="input-group col-lg-6 mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <i class="fa fa-lock text-muted"></i>
                                    </span>
                                </div>
                                <input id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    class="form-control bg-white border-left-0 border-md"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {checkError ? (
                                <Fragment>
                                    <span id="signUpErrorSpan">
                                        {error}
                                    </span>
                                </Fragment>
                            ) : (
                                    <Fragment></Fragment>
                                )}


                            {/* <!-- Submit Button --> */}
                            <div class="form-group col-lg-12 mx-auto mb-0">
                                <button class="btn btn-primary btn-block py-2">
                                    <span class="font-weight-bold">Create your account</span>
                                </button>
                            </div>

                            {/* <!-- Divider Text --> */}
                            <div class="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                                <div class="border-bottom w-100 ml-5"></div>
                                <span class="px-2 small text-muted font-weight-bold text-muted">OR</span>
                                <div class="border-bottom w-100 mr-5"></div>
                            </div>


                            {/* <!-- Already Registered --> */}
                            <div class="text-center w-100">
                                <p class="text-muted font-weight-bold">Already Registered? <a href="/login" class="text-primary ml-2">Login</a></p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>




    )
}

export default SignupForm
