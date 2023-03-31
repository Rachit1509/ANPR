import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import {currentCarData} from '../utils/firebase.js'

function InputFile() {

  useEffect(() => {
    currentCarData();
  }, []);

  return (
    <div className="App">
      <h1> Input File </h1>
    </div>
  )
}

export default InputFile;
