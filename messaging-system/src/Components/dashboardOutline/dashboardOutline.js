import React, { useEffect, useState, Fragment } from 'react'
import './dashboardOutline.css'
import { db, auth } from '../../Firebase/firebase'
import { MDBIcon } from "mdbreact"
import Button from '../button'
import { useAlert } from 'react-alert'


const DashboardOutline = () => {
    const alert = useAlert();
    const [userInfo, setUserInfo] = useState({})
    const [showPopUp, setShowPopUp] = useState(false)
    const [emailData, setEmailData] = useState({

        from: "",
        subject: "",
        to: "",
        message: "",
        creationDate: new Date()



    })


    useEffect(() => {

        //get data of currently logged in user
        auth.onAuthStateChanged(async user => {
            if (user) {
                const userData = await db.collection('users').doc(user.uid).get()
                setUserInfo(userData.data())
            }

        })

    }, [])



    const handleChange = (e) => {


        setEmailData({ ...emailData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {

        e.preventDefault()


        //update the object of emailInfo to include the current user email

        emailData.from = userInfo.email



        db.collection("messages").add(emailData);

       
        alert.show('Your message has been sent successfully', {
            timeout: 4000, 
            type: 'success'
        })

        setShowPopUp(false)

    }


    return (
        <div>

            {/* <!-- Compose Button which is connected to popup onClick --> */}

            <div className="composeButtonContainer">



                <button className="composeButton fas fa-edit" onClick={() => setShowPopUp(true)}></button>

            </div>

            {/* <!-- Dynamic Dashboard header accroding to the loggedin user --> */}

            <div className="dashboardHeaderContainer">

                <h3 > Welcome back <b> {userInfo.firstName} </b> , It feels great to see you again ! </h3>
            </div>

            {/* <!-- In case of clicking compose ,  a popup will appear on right bottom side of the screen--> */}
            {/* <!-- The popup will include the form to email people --> */}

            {showPopUp ? (

                <Fragment>

                    <div class="checkingPopUp popupFormContainer">

                        <div className="popUpFormControlButtonsContainer">

                            < MDBIcon icon="times" className="text-secondary pl-3" onClick={() => setShowPopUp(false)} />

                        </div>

                        <form class="popUpForm" onSubmit={handleSubmit}>
                            <label> From
                                <input className="popUpDefaultInput" id="from" type="text" defaultValue={userInfo.email} disabled />
                            </label>

                            <input class="popUpInputs" type="text" id='subject' placeholder="subject" onChange={handleChange} required />

                            <input class="popUpInputs" type="email" id='to' placeholder="To" onChange={handleChange} required />

                            <textarea class="popUpArea" type="text" id='message' placeholder="message" rows="4" cols="50"
                                onChange={handleChange} required />

                            <Button text="Send" type="submit" color="#0069D9"></Button>


                        </form>


                    </div>


                </Fragment>

            ) :

                (

                    <Fragment> </Fragment>


                )


            }

        </div>
    )
}

export default DashboardOutline
