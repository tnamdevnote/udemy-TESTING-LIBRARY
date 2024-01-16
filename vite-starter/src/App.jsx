import { useState } from 'react';
import './App.css';
import kebabCaseToTitleCase from './helper';
function App() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [btnColor, setBtnColor] = useState('medium-violet-red');
  const nextColor = btnColor === 'medium-violet-red' ? 'midnight-blue' : 'medium-violet-red';
  const nextColorTitleCase = kebabCaseToTitleCase(nextColor);
  const className = isDisabled ? 'grey' : btnColor;

  return (
    <div className="container">
      <button className={className} disabled={isDisabled} onClick={() => setBtnColor(nextColor)}>
        {`Change to ${nextColorTitleCase}`}
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
