import React, { useCallback, useRef, useState } from 'react';
import axios from 'axios'

const API_PREFIX = 'http://localhost:8000/api';
function App() {
  const [bears, setBears] = useState([]);
  const doFetch = useCallback(async () => {
    const response = await axios.get(API_PREFIX + '/bears')
    setBears(response.data)
  }, [bears]);  

  const idInput = useRef();
  const weightInput = useRef();

  const doCreate = useCallback(async () => {
    const response = await axios.post(API_PREFIX + '/bears', {
      id: idInput.current.value,
      weight: Number(weightInput.current.value)
    })
    if(response.data.ok){
      idInput.current.value = ''
      weightInput.current.value = ''
    }
  })
    
  return (
    <div>
      id: <input type="text" ref={idInput}></input>
      weight: <input type="number" ref={weightInput}></input>
      <button onClick={doCreate}>Create</button>
      <hr/>
      <button onClick={doFetch}>Fetch</button>
      <ul>
        {
          bears.map(it => <li key={it.id}>{it.id} {it.weight}</li>)
        }
      </ul>      
    </div>
  );
}

export default App;
