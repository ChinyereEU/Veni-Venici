import { useState } from 'react'
import './App.css'
import APIForm from '../components/APIForm';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  // const [count, setCount] = useState(0)

  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
  });

  const submitForm = (e) => {
    e.preventDefault();
  };

  // const handleChange = (e) => {
  //   setInputs((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value.trim(),
  //   }));
  // };

  return (
    <div className="whole-page">
      <h1 className="puppy-lane">Puppy Lane🐕‍🦺</h1>
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
        apiKey={ACCESS_KEY}
      />
      <br></br>
    </div>
    
  );
}

export default App;
