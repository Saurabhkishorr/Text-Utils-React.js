import './App.css';
import Alert from './Component/Alert';
import About from './Component/About';
import Navbar from './Component/Navbar';
import TextForm from './Component/TextForm';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [mode, setmode] = useState("light");
  const [alert, setalert] = useState(null);
  const [darkmodetxt, setdarkmodetxt] = useState("Enable Dark mode");

  const togglemode = () => {
    if (mode === "light") {
      setmode("dark")
      setdarkmodetxt("Enable light mode")
      document.body.style.backgroundColor = '#042743'
      showalert('Dark mode has been enabled', 'success')
      document.title = 'Textutils-Dark mode';
    }
    else {
      setmode("light")
      setdarkmodetxt("Enable Dark mode")
      document.body.style.backgroundColor = '#fff'
      showalert('light mode has been enabled', 'success')
      document.title = 'Textutils-light mode';
    }
  }

  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setalert(null)
    }, 2000);
  }



  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={mode} togglemode={togglemode} darkmodetext={darkmodetxt} aboutText="About Us" />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route exact path="/about" element={<About mode={mode} />} />
            <Route exact path="/" element={<TextForm heading="Enter the text to analyze below" mode={mode} showalert={showalert} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

// htmlFor
// tabIndex
// className
// <></> jsx fragment

// {
//   "src": "logo192.png",
//   "type": "image/png",
//   "sizes": "192x192"
// },

// {
//   "src": "logo512.png",
//   "type": "image/png",
//   "sizes": "512x512"
// }