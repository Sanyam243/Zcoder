import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {toast} from 'react-toastify';

const BookmarkedQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');






  const addQuestion= ()=> {
    window.location.href='/addquestion';
  }
  useEffect(() => {
    if (localStorage.getItem('success')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user.email);
    }
  }, []);
  const fetchQuestions = async () => {
    if (!user) return; // If user is not set, return early
    try {
      const response = await fetch(`http://localhost:3000/question?email=${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch bookmarked questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
      //console.log(data.questions);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
  
    fetchQuestions();
  }, [user]);



  const MyBookmarks=()=>{
    window.location.href='/mybookmarks';
  }

  const  bookmarkQuestion = async (questionId) =>{
    // Example: log the question ID to the console
   // console.log("Bookmarking question with ID:", questionId);


    try {
      const response = await fetch(`http://localhost:3000/bookmark/${questionId}/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status===400) {
        //const errorData =  response.json();
          const text = await response.text();

          if(text==="Question already bookmarked"){
            toast.error("Question already bookmarked");
          }
          fetchQuestions();
          return;
      
       // throw new Error(errorData.message || 'Failed to fetch bookmarked questions');
       
    }

     
      
      const data = await response.json();
     
    console.log(data);
    toast.success("Question Bookmarked Successfully");
    } catch (error) {
      setError(error.message);
    } 
  
    
   
 }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <div className="flex justify-between ">
      <h2 className="text-2xl font-bold mb-4 text-white"> Questions</h2>
      <button  onClick={addQuestion} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add a Question</button>
      <button  onClick={MyBookmarks} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">My Bookmarks</button>
      </div>
  
  <div id="questions-container" className="space-y-4">
    {questions.map((question) => (
      <div className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
        <h3 className="text-xl font-semibold text-blue-400 mb-2">{question.title}
          
        </h3>
        <button
              onClick={() => bookmarkQuestion(question._id)}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Bookmark
            </button>
        <a href={question.link} target='blank' className="text-blue-300 underline hover:text-blue-500 mb-2 block">Link to the Problem</a>
        <p className="text-gray-400 mb-2"><strong>Topics:</strong> {question.topics.join(", ")}</p>
        <p className="text-gray-400"><strong>Solution:</strong>  <SyntaxHighlighter language="cpp"  showLineNumbers>
      {question.solution}
    </SyntaxHighlighter></p>
      </div>
    ))}
  </div>
</div>


  );
};

export default BookmarkedQuestions;
