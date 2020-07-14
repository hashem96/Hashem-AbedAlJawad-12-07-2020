import React, { useEffect, useState, Fragment } from 'react'
import './dashboardOutline.css'
import { db, auth } from '../../Firebase/firebase'
import { MDBIcon } from "mdbreact"
import Button from '../button'
import { useAlert } from 'react-alert'
import Popup from "reactjs-popup";


const DashboardOutline = () => {
    const alert = useAlert();
    const [userInfo, setUserInfo] = useState({})
    const [showComposePopUp, setShowComposePopUp] = useState(false)
    const [checkUserEmails, setCheckUserEmails] = useState()
    const [userEmails, setUserEmails] = useState([])
    const [emailPopUp, setEmailPopUp] = useState({})
    const [emailData, setEmailData] = useState({
        from: "",
        subject: "",
        to: "",
        message: "",
        timeStamp: new Date(),
        creationDate: "",
        creationTime: ""
    })


    useEffect(() => {

        //get data of currently logged in user
        auth.onAuthStateChanged(async user => {
            if (user) {
                const userData = await db.collection('users').doc(user.uid).get()
                setUserInfo(userData.data())

                //getting all the messages that has been sent to the user  , if any

                db.collection("messages").where("to", "==", userData.data().email).orderBy("timeStamp", "desc")
                    .onSnapshot(snapShot => {

                        if (snapShot.empty) {

                            //change state to false - show no emails screen

                            setCheckUserEmails(false);

                            // If thr user has emails another view will appear 

                        } else {

                            setCheckUserEmails(true);

                            const emailsInfo = snapShot.docs.map(email => {

                                return email

                            })

                            setUserEmails(emailsInfo)

                        }

                    })

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


        //Convert creationDate from UTC format to Date & time format

        var formattedDate = emailData.timeStamp.getDate() + "-" + (emailData.timeStamp.getMonth() + 1) + "-" + emailData.timeStamp.getFullYear();

        var hours = (emailData.timeStamp.getHours() < 10) ? "0" + emailData.timeStamp.getHours() : emailData.timeStamp.getHours();
        var minutes = (emailData.timeStamp.getMinutes() < 10) ? "0" + emailData.timeStamp.getMinutes() : emailData.timeStamp.getMinutes();
        var formattedTime = hours + ":" + minutes;


        emailData.creationDate = formattedDate;

        emailData.creationTime = formattedTime;



        //Adding email object with all the details to firebase

        db.collection("messages").add(emailData);


        //Showing alert message after successful adding all the email details to firebase

        alert.show('Your message has been sent successfully', {
            timeout: 4000,
            type: 'success'
        })

        //Close the model after sending the email

        setShowComposePopUp(false)

    }


    const deleteEmail = (e) => {

        console.log(e.target.id)

        db.collection('messages').doc(e.target.id).delete();

    }


    const handleClick = (e) => {

        setEmailPopUp({ id: e.target.id, status: true })
    }



    return (
        <div>

            {/* <!-- Compose Button which is connected to popup onClick --> */}

            <div className="composeButtonContainer">



                <button className="composeButton fas fa-edit" onClick={() => setShowComposePopUp(true)}></button>


            </div>

            {/* <!-- Dynamic Dashboard header accroding to the loggedin user --> */}

            <div className="dashboardHeaderContainer">

                <h3 > Welcome back <b> {userInfo.firstName} </b> , It feels great to see you again ! </h3>
            </div>



            {/* <!-- Headers of the table --> */}


            <ul className="emailsHeaderContainer">

                <li className="emailHeaders">From</li>
                <li className="emailHeaders">Subject</li>
                <li className="emailHeaders">Date</li>
                <li className="emailHeaders"></li>




            </ul>

            {/* <!-- First view of the dashboard when the user has emails realted to his email --> */}


            {checkUserEmails ? (

                <Fragment>

                    {userEmails.map((userEmail) => (
                        <ul className="emailListContainer">
                            <li className="emailData" id={userEmail.id} onClick={handleClick} >{userEmail.data().from} </li>
                            <li className="emailData" id={userEmail.id} onClick={handleClick}>{userEmail.data().subject}</li>
                            <li className="emailData" id={userEmail.id} onClick={handleClick}>{userEmail.data().creationDate} {userEmail.data().creationTime}</li>
                            {emailPopUp.status && emailPopUp.id === userEmail.id ? (

                                <Fragment>

                                    <Popup

                                        open={true}
                                        modal
                                        position="left top"
                                        closeOnDocumentClick>
                                        {(close) => (
                                            <div className="container">
                                                <a className="close"
                                                    onClick={() => {
                                                        close();
                                                    }}
                                                > X </a>

                                                <div className="content">

                                                    {userEmail.data().message}

                                                </div>
                                            </div>
                                        )}

                                    </Popup>

                                </Fragment>

                            ) : (
                                    <Fragment> </Fragment>
                                )}

                            <li className="emailData"><MDBIcon id={userEmail.id} icon="trash" className="text-secondary" onClick={deleteEmail} /></li>

                        </ul>
                    ))}

                </Fragment>


            ) : (

                    <Fragment>

                        {/* <!-- Second view of the dashboard when the user does not have any email --> */}

                        <span id="emailsSpan">You dont have an email at your inbox </span>
                    </Fragment>


                )
            }
            {/* <!-- In case of clicking compose , a popup will appear on right bottom side of the screen (Opening View)--> */}

            {/* <!-- The popup will include form to email people  --> */}

            {showComposePopUp ? (

                <Fragment>

                    <div class="checkingPopUp popupFormContainer">

                        <div className="popUpFormControlButtonsContainer">

                            < MDBIcon icon="times" className="text-secondary pl-3" onClick={() => setShowComposePopUp(false)} />

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

            ) : (

                    //PopUp Closing View

                    <Fragment> </Fragment>

                )
            }



        </div >
    )
}

export default DashboardOutline
