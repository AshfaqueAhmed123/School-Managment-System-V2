import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateTeacherForm from "./CreateNewTeacherForm";
import Loader from "@/./Loader";

let color = ["#2E2E48", "#383854", "#475BE8"];

const TeacherTable = () => {
  // Dummy teacher data
  const [teachers, setTeachers] = useState([

  ]);

  const notifySucess = (message) => toast.success(message);

  // Function to handle the deletion of a teacher
  const deleteTeacher = (index, teacherId) => {
    // const updatedTeachers = teachers.filter((_, i) => i !== index);
    // setTeachers(updatedTeachers);
    (async () => {
      let res = await fetch(`http://localhost:4000/teacher/deleteTeacher/${teacherId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      })
      res = await res.json();
      if (res.statusCode == 200) {
        notifySucess("Teacher deleted!")
      }
      await getAllTeachers();
    })()
  };

  const teachersArray = [];

  const getAllTeachers = async () => {
    let res = await fetch("http://localhost:4000/teacher/allTeachersList", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    })
    res = await res.json();
    setTeachers(res.list)
  }

  useEffect(() => {
    // setTeachers(teachersArray)
    (async () => {
      await getAllTeachers();
    })()
  }, [])
  /*  
    useEffect(() => {
      (async ()=>{
        try {
          let res = await fetch(
            "http://localhost:4000/teacher/allTeachersList",
            {
              method:"GET",
              headers:{
                "content-type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem  ("AdminToken")}`
              }
            }
          )
          res = await res.json();
          if(res){
            console.log(res);
           setTeachers(res?.list || [])
          }
          
        } catch (error) {
          console.log(error);
        }
      })()
      
    }, []);
  */

  return (
    <div className="p-6">
      <ToastContainer />
      {/* Create Teacher Button */}
      <div className="flex justify-end mb-4">
        <button className="px-4 py-2 bg-[#475BE8] text-white rounded-lg hover:bg-blue-600 focus:outline-none">
          <Dialog>
            <DialogTrigger className="flex items-center">
              <FaPlus className="mr-2" />
              Create Teacher
            </DialogTrigger>
            <DialogContent className="bg-[#383854] text-white">
              <DialogHeader>
                <DialogTitle className="mb-3 mx-3">create new teacher</DialogTitle>
                <DialogDescription className="h-[80vh] overflow-scroll">
                  <CreateTeacherForm setTeachers={setTeachers} getAllTeachers={getAllTeachers} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-[#2E2E48] p-6 rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-[#2E2E48] text-white">
            <tr className="border-2 border-white p-2">
              <th className="px-6 py-3 text-left text-xl font-medium">
                Teacher Name
              </th>
              <th className="px-6 py-3 text-left text-xl font-medium">
                Teacher Subject
              </th>
              <th className="px-6 py-3 text-left text-xl font-medium">
                Teacher Class
              </th>
              <th className="px-6 py-3 text-left text-xl font-medium">
                Actions
              </th>{" "}
              {/* New Column for Delete */}
            </tr>
          </thead>
          <tbody className="bg-[#2E2E48] text-white">
            {teachers.length == 0 ? <Loader /> : ""}
            {teachers.map((teacher, index) => (
              <tr key={index} className="hover:bg-[#383854]">
                <td className="px-6 py-4 text-sm font-medium">
                  {teacher?.fullname}
                </td>
                <td className="px-6 py-4 text-sm">{teacher?.subject}</td>
                <td className="px-6 py-4 text-sm">{teacher?.classTeacherOfClass}</td>
                <td className="px-6 py-4 text-sm text-center">
                  {/* Delete Button */}
                  <button
                    id={teacher?._id}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                    onClick={(e) => {
                      const confrmation = confirm("do you want to delete teacher?")
                      if (confrmation) {
                        deleteTeacher(index, e.target.id)
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherTable;
