import React from 'react';
import { createBrowserRouter , Route, RouterProvider } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Register from './components/Register';
import Bookmark from './components/Bookmark';


const App = () => {

  const router=createBrowserRouter([
    {
      path:'/home',
      element: <HeroSection />
     
    },
    {
      path:'/',
      element: <HeroSection />
     
    },
    {
      path:"/login",
      element:<SignUp/>

    },

    {
      path:"/register",
      element:<Register/>

    },
    {
      path:"/bookmark",
      element:<Bookmark/>

    }
  ])
  return (
    <>
      <Nav />
      
      <div className="max-w-7xl mx-auto pt-20 px-6">
      <RouterProvider router={router}/>
       
       
       
        <Footer />
      </div>



      
      </>
    
  );
}

export default App;
