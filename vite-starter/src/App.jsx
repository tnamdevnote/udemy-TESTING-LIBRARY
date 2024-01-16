import { useState } from 'react';
import './App.css';
function App() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [btnColor, setBtnColor] = useState('red');
  const nextColor = btnColor === 'red' ? 'blue' : 'red';

  return (
    <div className="container">
      <button className={isDisabled ? 'grey' : btnColor} disabled={isDisabled} onClick={() => setBtnColor(nextColor)}>
        {`Change to ${nextColor}`}
      </button>
      <div>
        <label htmlFor="disable-btn-checkbox">Disable button</label>
        <input
          type="checkbox"
          id="disable-btn-checkbox"
          defaultChecked={isDisabled}
          onChange={(e) => setIsDisabled(e.target.checked)}
        />
      </div>
    </div>
  );
}

export default App;
