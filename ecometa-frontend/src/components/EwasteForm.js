import React, { useState } from 'react';
import axios from 'axios';
import '../resources/css/EwasteForm.css'


function EwasteForm() {
  const [ewaste, setEwaste] = useState({ type: '', condition: '', quantity: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!ewaste.type || !ewaste.condition || !ewaste.quantity) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/ewaste/submit', ewaste, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('E-waste submitted successfully!');
      setEwaste({ type: '', condition: '', quantity: 0 });  // Reset form after success
    } catch (error) {
      console.error(error);
      alert(error.response ? error.response.data.message : 'Failed to submit e-waste!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type"
        value={ewaste.type}
        onChange={(e) => setEwaste({ ...ewaste, type: e.target.value })}
      />
      <input
        type="text"
        placeholder="Condition"
        value={ewaste.condition}
        onChange={(e) => setEwaste({ ...ewaste, condition: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={ewaste.quantity}
        onChange={(e) => setEwaste({ ...ewaste, quantity: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EwasteForm;
