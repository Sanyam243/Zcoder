import React, { useState, useEffect } from 'react';

const BookmarkedQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    if (localStorage.getItem('success')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user.email);
    }
  }, []);

  useEffect(() => {
    const fetchBookmarkedQuestions = async () => {
      if (!user) return; // If user is not set, return early
      try {
        const response = await fetch(`http://localhost:3000/bookmarkquestions?email=${user}`, {
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
        setQuestions(data.bookmarkedQuestions);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedQuestions();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Bookmarked Questions</h2>
      <div id="questions-container">
        {questions.map((question) => (
          <div >
            <h3>{question.title}</h3>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkedQuestions;
