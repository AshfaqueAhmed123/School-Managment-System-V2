import { selectClasses } from '@mui/material';
import React, { useRef, useState } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog"



const CreateMeetingForm = ({setMeetings}) => {

  const [title,setTitle] = useState("")
  const [instructor,setInstructor] = useState("teacher");
  const [Cclass,SetCclass] = useState(["1","2","3"]);
  const [student,setStudent] = useState(["Ashfaque","student","other"]);
  const [date,setDate] = useState("");
  const [time,setTime] = useState("");

  const [seletedStudent,setSeletedStudent] = useState(student[0])
  const [seletedClass,setSeletedClass] = useState(Cclass[0])

  const closeBtn = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    (async()=>{
      try {
        let res = await fetch("http://localhost:4000/meeting/",{
          method:"POST",
          headers:{
            "content-type":"application/json",
          },
          body:JSON.stringify({
            title,
            instructor,
            parent : seletedStudent,
            class : seletedClass,
            teacher : instructor,
            time : time,
            date : date 
          })
        })
        res = await res.json();
        console.log(res);
        closeBtn.current.click();

        (async ()=>{
          try {
            let res = await fetch("http://localhost:4000/meeting/");
            res = await res.json()
            if(res){
              setMeetings(res?.data)
            }
          } catch (error) {
            console.log(error);
          }
        })()

      } catch (error) {
        
      }
    })()
  }


  return (
    <form className="w-full max-w-md mx-auto bg-[#2E2E48] p-6 rounded-lg text-white">
      <h2 className="text-2xl font-semibold mb-4">Create New Meeting</h2>

      {/* Title Input */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Meeting Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
          placeholder="Enter meeting title"
          required
        />
      </div>


      {/* Instructor Input */}
      <div className="mb-4">
        <label htmlFor="instructor" className="block text-sm font-medium mb-2">
          Instructor Name
        </label>
        <select name="instructor" id="instructor" className='w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md'>
          <option value={instructor}>{instructor}</option>
        </select>
      </div>

      {/* class */}
      <div className="mb-4">
        <label htmlFor="class" className="block text-sm font-medium mb-2">
        class
        </label>
        <select value={seletedClass} onChange={(e)=>setSeletedClass(e.target.value)} name="class" id="class" className='w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md'>
          {Cclass.map((e) => <option value={e}>{e}</option>)}
        </select>
      </div>

       {/* children */}
       <div className="mb-4">
        <label htmlFor="child" className="block text-sm font-medium mb-2">
        student
        </label>
        <select value={seletedStudent} onChange={(e)=>setSeletedStudent(e.target.value)} name="child" id="child" className='w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md'>
          {student.map(student => <option value={student}>{student}</option>)}
        </select>
      </div>

      {/* Date Input */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium mb-2">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
          required
        />
      </div>

      {/* Time Input */}
      <div className="mb-4">
        <label htmlFor="time" className="block text-sm font-medium mb-2">
          Time
        </label>
        <input
          type="time"
          id="time"
          name="time" 
          value={time}
          onChange={(e) => setTime(e.target.value)}         
          className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="mt-4">
      
        <button
        onClick={(e)=>handleSubmit(e)}
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Create Meeting
        </button>
        <DialogPrimitive.Close >
        <button className='hidden' ref={closeBtn}></button>
        </DialogPrimitive.Close>
      </div>
    </form>
  );

}

export default CreateMeetingForm;
