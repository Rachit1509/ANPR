import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import {pastCarData} from '../utils/firebase.js'

function PastCarData() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    pastCarData();
  }, []);

  return (
    <div className="App">
      <h1> Past Car Data </h1>
    </div>
  )
}

export default PastCarData;
