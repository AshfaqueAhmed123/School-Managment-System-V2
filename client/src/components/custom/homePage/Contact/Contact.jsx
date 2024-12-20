import React from 'react';
import "./Contact.css";
import msg_icon from "../../../../assets/msg-icon.png";
import mail_icon from "../../../../assets/mail-icon.png";
import phone_icon from "../../../../assets/phone-icon.png";
import location_icon from "../../../../assets/location-icon.png";
import white_arrow from "../../../../assets/white-arrow.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactSection = () => {

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);

      formData.append("access_key", `f2b7c4a8-0bb4-40e3-ab72-dee9a5683669`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent Successfully!");
        event.target.reset();
        notifySuccess("Message sent Successfully!");
        setTimeout(() => {
          setResult("");
        }, 2000);
      } else {
        console.error("Error", data);
        notifyError(data.message);
        setResult(data.message);
        setTimeout(() => {
          setResult("");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      notifyError("Couldn't send message, something went wrong! TRY AGAIN!!");
      setResult("");
      event.target.reset();
    }
  };

  return (
    <div className='contact'>
      <ToastContainer />
      <div className="contact-col">
        <h3>Send us a message <img src={msg_icon} alt="" /> </h3>
        <p>
          Feel free to reach out through the contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service to our college community.
        </p>
        <ul>
          <li> <img src={mail_icon} alt="" /> contact@ibaccdadu.org</li>
          <li> <img src={phone_icon} alt="" /> +92 023857382</li>
          <li> <img src={location_icon} alt="" /> Najam colony, near Ustad Bukhari Degree College Road, Daud, Dadu Sindh, Pakistan</li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input className='text-white' type="text" name='name' placeholder='Enter Your Name' required />
          <label>Phone Number</label>
          <input className='text-white' type="tel" name='phone' placeholder='Enter your mobile number' required />
          <label>Write your message here</label>
          <textarea className='text-white' name="message" rows={6} placeholder='Your message' required></textarea>
          <button type='submit' className='btn dark-btn'>Submit now <img src={white_arrow} alt="" className='w-[25px] ml-3' /> </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default ContactSection;
