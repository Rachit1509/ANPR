import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import {currentCarData} from '../utils/firebase.js'
import { Link } from 'react-router-dom'

function CurrentCarData() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    currentCarData();
  }, []);

  return (
    <div className="App">
      <nav>
        <h1>ANPR</h1>
        <div className="links">
          <h1><Link to="/past-car-data">Past Car Data</Link></h1>
          <h1><Link to="/input-file">Input File</Link>6</h1>
        </div>
      </nav>
      <h1> Current Car Data </h1>
    </div>
  )
}

export default CurrentCarData;
