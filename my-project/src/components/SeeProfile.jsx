import React from 'react'
import { useLocation } from 'react-router-dom';
import img1 from "../assets/codeforces.webp";
import img2 from "../assets/leetcode.svg";
import img3 from "../assets/gfg.png";
import img4 from "../assets/atcoder.png";
import img5 from "../assets/codechef.jpg";
import { useState } from 'react';

const SeeProfile = () => {
  const location = useLocation();
 const data = location.state.data.user;
  console.log(data);

  const [codeforces ,setCodeforces]= useState('');
  const [codechef ,setCodechef]= useState('');
  const [leetcode ,setLeetcode]= useState('');
  const [atcoder ,setAtcoder]= useState('');
  const [geeksforGeeks ,setGeeksforGeeks]= useState('');
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
 
  
  return (
    
       <div class="container mx-auto my-60">
        <div>

            <div class="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                <div class="flex justify-center">
                        <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                </div>
                
                <div class="mt-16">
                    <h1 class="font-bold text-center text-3xl text-gray-900">{data.first_name}</h1>
                    <p class="text-center text-sm text-gray-400 font-medium">{data.college}</p>
                    <p>
                        <span>
                            
                        </span>
                    </p>
                    <div class="my-5 px-6">
                        <a href="#" class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Connect with <span class="font-bold">@{data.userhandle}</span></a>
                    </div>
                  

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
    
  )
}

export default SeeProfile
