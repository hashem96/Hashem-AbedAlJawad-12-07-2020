import React from 'react'
import './notFoundContent.css'
import { MDBIcon } from 'mdbreact'


const NotFoundContent = () => {

    const goHome = () => {

        window.location.href = '/';
    }
    return (
        <div className="notFoundcontainer">

            <div class="mainbox">
                <div class="err">4</div>
                <i class="far fa-question-circle fa-spin"></i>
                <div class="err2">4</div>
                <div class="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go home and try from there.</p>
                    <MDBIcon icon="home" size="2x" onClick={goHome} className="homeButton text-light" />
                </div>
            </div>



        </div>
    )
}

export default NotFoundContent
