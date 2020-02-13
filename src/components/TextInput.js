import React, { useContext } from 'react';
import storeContext from '../context';

function TextInput() {
  const { setNameFilter } = useContext(storeContext);
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setNameFilter(e.target.value)}
        placeholder="Nome"
        data-testid="nameInput"
      />
    </div>
  );
}

export default TextInput;
