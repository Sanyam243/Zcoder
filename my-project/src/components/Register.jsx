
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';



const Register = () => {
    const navigateTo = useNavigate();
  const [credentials, setCredentials] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    city: '',
    college: '',
    profile_image: null,
    userhandle: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', credentials.first_name);
    formData.append('last_name', credentials.last_name);
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);
    formData.append('city', credentials.city);
    formData.append('college', credentials.college);
    formData.append('profile_image', credentials.profile_image);
    formData.append('userhandle', credentials.userhandle);
    console.log(credentials);

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: formData
      });
     
    // history.push('/home');
      if (!response.ok) {
        
        toast.error("Invalid credentials")

        navigateTo('/')
      } else {
        const data = await response.json();
        console.log(data);
        toast.success("Registration successful")
        navigateTo('/')
         // Uncomment this to navigate to home after successful registration
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const onChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setCredentials({ ...credentials, [name]: files[0] });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="py-10 my-auto dark:bg-gray-900">
          <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
            <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
              <div>
                <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                  Profile
                </h1>
                <h2 className="text-grey text-sm mb-4 dark:text-gray-400">Create Profile</h2>

                <div className="w-full mb-4 mt-6">
                  <label htmlFor="profile_image" className="mb-2 dark:text-gray-300">Profile Image</label>
                  <input type="file" name="profile_image" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" onChange={onChange} />
                </div>

                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <label htmlFor="first_name" className="mb-2 dark:text-gray-300">First Name</label>
                    <input type="text" name="first_name" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="First Name" value={credentials.first_name} onChange={onChange}  required/>
                  </div>
                  <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="last_name" className="dark:text-gray-300">Last Name</label>
                    <input type="text" name="last_name" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="Last Name" value={credentials.last_name} onChange={onChange}required />
                  </div>
                </div>
                <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="last_name" className="dark:text-gray-300">User handle</label>
                    <input type="text" name="userhandle" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="UserHandle" value={credentials.userhandle} onChange={onChange}required />
                  </div>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <label htmlFor="email" className="mb-2 dark:text-gray-300">Email</label>
                    <input type="email" name="email" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="Email" value={credentials.email} onChange={onChange}required />
                  </div>
                  <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="password" className="dark:text-gray-300">Password</label>
                    <input type="password" name="password" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="Password" value={credentials.password} onChange={onChange} required/>
                  </div>
                </div>

                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <label htmlFor="city" className="mb-2 dark:text-gray-300">City</label>
                    <input type="text" name="city" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="City" value={credentials.city} onChange={onChange}required />
                  </div>
                  <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="college" className="dark:text-gray-300">College</label>
                    <input type="text" name="college" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="College" value={credentials.college} onChange={onChange} required />
                  </div>
                </div>

                <button type="submit" className="mt-6 p-4 w-full bg-blue-500 text-white rounded-lg">Submit</button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Register;
