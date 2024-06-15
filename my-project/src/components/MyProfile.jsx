
import React from 'react'
import {useEffect, useState } from 'react';
import  './Profile.css';
import {  platformLinks } from "../constants";
import { useNavigate } from 'react-router-dom';
import img1 from "../assets/codeforces.webp";
import img2 from "../assets/leetcode.svg";
import img3 from "../assets/gfg.png";
import img4 from "../assets/atcoder.png";
import img5 from "../assets/codechef.jpg";







const MyProfile = () => {
  const navigateTo = useNavigate();
    const [user,setUser]=useState('');
    const [first_name,setFirst_name]=useState('');
    const [last_name,setLast_name]=useState('');
    const [college,setCollege]=useState('');
    const [city,setCity]=useState('');
    const [search,setSearch]=useState('');
    const [handles,setHandles]=useState([]);
    const [codeforces ,setCodeforces]= useState('');
    const [codechef ,setCodechef]= useState('');
    const [leetcode ,setLeetcode]= useState('');
    const [atcoder ,setAtcoder]= useState('');
    const [geeksforGeeks ,setGeeksforGeeks]= useState('');
  
   
    let bookmarkedQ=0;
    let totalQ=0;
 



useEffect(()=>{
  if(localStorage.getItem('success')){
    const user2=JSON.parse(localStorage.getItem('user'));
    setFirst_name(user2.first_name);
   // console.log(user2.first_name);
   //console.log(user2);

  
  //console.log(user2.handles);
   
    
  
    
    setCollege(user2.college);
    setCity(user2.city);

    setLast_name(user2.last_name);
    setUser(user2.email);
    
  }
})

useEffect(() => {
    const Profile = async () => {
      if (!user) return; // If user is not set, return early
      try {
        const response = await fetch(`http://localhost:3000/profile?email=${user}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch profile');
        }

         const data = await response.json();
        console.log(data);
      

        const userhandles =data.user.handles

        if(userhandles.hasOwnProperty('Codeforces')){
          
            setCodeforces(userhandles.Codeforces)
            
        }
        if(userhandles.hasOwnProperty('Codechef')){
       
          setCodechef(userhandles.Codechef)
          
      }
      if(userhandles.hasOwnProperty('Leetcode')){
       
        setLeetcode(userhandles.Leetcode)
        
    }
    if(userhandles.hasOwnProperty('Atcoder')){
      
      setAtcoder(userhandles.Atcoder)
      
  }
  if(userhandles.hasOwnProperty('GeeksforGeeks')){
   
    setGeeksforGeeks(userhandles.GeeksforGeeks)
    
}
        
       
       

       
       // console.log(data.user.handles);
       
      } catch (error) {
        setError(error.message);
      } 
    };

    Profile();
  }, [user]);


  const platforms = [
    {
      name: 'Codeforces',
     icon: <img src={img1} alt="codeforces" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cf',
      
     link:codeforces,
     default:'https://codeforces.com/'

      //link: handles.Codeforces ? handles.Codeforces: 'https://codeforces.com/',


      
     
    },
    {
      name: 'CodeChef',
     icon: <img src={img5} alt="codechef" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:codechef,
      default:'https://codechef.com/'
    },
    {
      name: 'LeetCode',
      icon: <img src={img2} alt="Leetcode" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:leetcode,
      deafult:'https://leetcode.com/'
    },
    {
      name: 'Atcoder',
      icon: <img src={img4} alt="Leetcode" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:atcoder,
      default:'https://atcoder.jp/'
    },

    {
      name: 'Geeks for Geeks',
      icon: <img src={img3} alt="Leetcode" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:geeksforGeeks,
       default:'https://atcoder.jp/'
    },
  ];
 

  const searchUser = async(e) => {
    e.preventDefault();
    //const search = e.target.value;
    console.log(search);
    // You can add your API call here to submit the form
    try {
        const response = await fetch(`http://localhost:3000/searchUser?userhandle=${search}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
         
        });

     
       
      // history.push('/home');
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert("Invalid search")
        } else {
          const data = await response.json();
          console.log(data);

           // alert("User found")
           // setViewUser(data.user);
          
        
          //
          navigateTo('/seeprofile',{state:{data: data}});
           
        }
      } catch (error) {
        alert("User not found")
        console.error("Fetch error:", error);
      }
  }

  onchange =(e)=>{
    e.preventDefault();
    setSearch(e.target.value);

  }

  return (
    <div>
   
   <div className="bg-gray-100">
    <div className="container mx-auto py-8">
        
<form onSubmit={searchUser} className="max-w-md mx-auto mb-8">   
    <label htmlFor="default-search"  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" value={search} onChange={onchange}id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search any User..." required />
        <button  type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex flex-col items-center">
                        <img src="https://randomuser.me/api/portraits/men/94.jpg" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">

                        </img>
                        <p className="text-gray-700 font-bold italic text-lg">{first_name} {last_name}</p>

                        <p className="text-gray-700">Software Developer</p>
                        <div className="mt-6 flex flex-wrap gap-4 justify-center">
                            <a href="/editprofile" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Edit Profile</a>
                            <a href= "/addHandle" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Add Handle</a>
                        </div>
                    </div>
                    <hr className="my-6 border-t border-gray-300"/>
                    <div className="flex flex-col">
                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">Profile Details</div>
        <div className="flex flex-col gap-4">
            <div>
                
                <div className="flex flex-wrap gap-2">
                    <p className="text-gray-700"><span className="font-semibold">College:</span> {college}</p>
                    <p className="text-gray-700"><span className="font-semibold">City:</span> {city}</p>
                </div>
            </div>
            <div>
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2 block">Skills</span>
                <ul className="list-disc list-inside text-gray-700">
                    <li className="mb-2">JavaScript</li>
                    <li className="mb-2">React</li>
                    <li className="mb-2">Node.js</li>
                    <li className="mb-2">HTML/CSS</li>
                    <li className="mb-2">Tailwind CSS</li>
                </ul>
            </div>
        </div>
    </div>
</div>

</div>

                </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-gray-700 font-bold  text-lg">About Me</h2>


                    <div className="mt-4">

                        <p className="text-gray-700">I am a software developer with 2 years of experience in building web applications. I have a strong foundation in computer science and have worked on various projects using JavaScript, React, Node.js, and other technologies. I am passionate about coding and always eager to learn new things.</p>
                    </div>
                    {/* <div className="relative w-40 h-40">
  <svg className="w-full h-full" viewBox="0 0 100 100">
    
    <circle
      className="text-gray-200 stroke-current"
      strokeWidth="10"
      
      cx="50"
      cy="50"
      r="40"
      fill="transparent"
    ></circle>
   
    <circle
      className="text-indigo-500  progress-ring__circle stroke-current"
      strokeWidth="10"
      strokeLinecap="round"
      cx="50"
      cy="50"
      r="40"
      fill="transparent"
      strokeDashoffset="calc(400 - (400 * 50) / 100)"
    ></circle>
    
   
    <text x="50" y="50" fontFamily="Verdana" fontSize="12" textAnchor="middle" alignmentBaseline="middle">50%</text>

  </svg>
</div> */}



<div className="p-4 max-w-screen-lg mx-auto mt-12">
      <p className="text-gray-700 font-bold  text-lg">User Handles</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mr-4">{platform.icon}</div>
            <div>
            <a href={platform.link ? `${platform.link}`:`${platform.default}`} target="_blank" className="text-gray-700 font-medium mt-1 text-shadow hover:text-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                {platform.name}
              </a>
             
            </div>
          </div>
        ))}
      </div>
    </div>


                    
                


                 
                  
                   
                
                </div>
            </div>
        </div>
    </div>
</div>


           
  </div>

    
  )
}

export default MyProfile
