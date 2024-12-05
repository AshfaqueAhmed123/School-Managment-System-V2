import React, { useState } from 'react';

const CreateTeacherForm = ({ onCreate, setTeachers }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    grade: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setTeachers((prev) => [...prev,{
      fullname:formData.name,
      subject:formData.subject,
      class : formData.grade
    }])
    // onCreate(formData); // Pass the form data to the parent onCreate function
    setFormData({
      name: '',
      subject: '',
      grade : ''
    }); // Clear the form after submission
    
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-[#2E2E48] p-6 rounded-lg text-white">
      <h2 className="text-2xl font-semibold mb-4">Create New Teacher</h2>

      {/* Name Input */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Teacher Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
          placeholder="Enter teacher's name"
          required
        />
      </div>

      {/* Subject Input */}
      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
          placeholder="Enter subject taught"
          required
        />
      </div>

      {/* class Input */}
      <div className="mb-4">
        <label htmlFor="grade" className="block text-sm font-medium mb-2">
          Class
        </label>
        <input
          type="text"
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
          placeholder="Enter email address"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Create Teacher
        </button>
      </div>
    </form>
  );
};

export default CreateTeacherForm;
