import React from 'react'
import './homeContent.css'
import Button from '../button'
import { Link } from 'react-router-dom'

const HomeContent = () => {
    return (

        <div className="homeContainer" >

            <div className="homeTopHeader">
                <h1 id="homeFirstHeader"><b>Welcome to our messaging system</b></h1>
                <h4 id="homeSecondHeader">where contacting people is much more <span id="spanInSecondHeader">easier</span></h4>

            </div>

            <div className="buttonsContainer">

                <Link id ="link" to="/signup">
                    <Button text="Signup"></Button>
                </Link>

                <Link id ="link" to ="/login">
                    <Button text="Login" color="#786564" marginLeft="50px"></Button>

                </Link>

            </div>


        </div>


    )
}

export default HomeContent
