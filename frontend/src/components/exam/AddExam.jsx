import React, { useState } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';

const AddExam = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:8080/api/exams', {
        title,
        description
      });

      if (response.status === 201) {
        setMessage('Exam added successfully!');
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      setMessage('Error adding exam. Please try again.');
      console.error(error);
    }
  };

  return (
      <>
      <Header/>
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Exam Title And Description</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>Submit</button>
        {message && <p>{message}</p>}
      </form>
    </div>
         <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    padding: '8px',
    marginBottom: '15px'
  },
  textarea: {
    padding: '8px',
    marginBottom: '15px',
    minHeight: '80px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#16243f',
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  },

  heading: {
    color: '#222',
    marginBottom: '20px',
  }

};


export default AddExam;
