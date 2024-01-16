import { useState } from 'react';
import './App.css';
function App() {
  const [btnColor, setBtnColor] = useState('red');
  const nextColor = btnColor === 'red' ? 'blue' : 'red';

  return (
    <div>
      <button className={btnColor} onClick={() => setBtnColor(nextColor)}>{`Change to ${nextColor}`}</button>
    </div>
  );
}

export default App;
