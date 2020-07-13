import React, { useState , Fragment } from 'react'
import './loginForm.css'
import { auth } from '../../Firebase/firebase'

const LoginForm = () => {

    const [loginInputs, setLoginInputs] = useState({})
    const [error, setError] = useState("");
    const [checkError, setCheckError] = useState(false);

    const handleChange = (e) => {

        setLoginInputs({ ...loginInputs, [e.target.id]: e.target.value })

    }

    const handleSubmit = (e) => {

        //check if the user exist in the auth of firebase

        auth.signInWithEmailAndPassword(loginInputs.email, loginInputs.password).then((cred) => {
        //If the user exists , we store his id into localStorage variable
        localStorage.setItem('userid', cred.user.uid)


        //Redirect to Dashboard after login 
        window.location.href = '/dashboard';


        // If the user does not exist , we handle the error by showing the corresponding message from firebase
        }).catch(function (err) {
            setCheckError(true)
            setError(err.message);

        });

        e.preventDefault()
    }


    return (

        <div class="container">
            <h1 id="signUpHeader">Login</h1>
            <div class="row py-5 mt-4 align-items-center justify-content-center">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div class="row">

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
                            <div class="input-group col-lg-12 mb-4">
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

                            {checkError ? (
                                <Fragment>
                                    <span id="loginErrorSpan">
                                        {error}
                                    </span>
                                </Fragment>
                            ) : (
                                    <Fragment></Fragment>
                                )}



                            {/* <!-- Submit Button --> */}
                            <div class="form-group col-lg-12 mx-auto mb-0">
                                <button class="btn btn-primary btn-block py-2">
                                    <span class="font-weight-bold">Login</span>
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
