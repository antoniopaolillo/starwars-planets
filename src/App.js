import React from 'react';
import './App.css';
import TextInput from './components/TextInput';
import ValuesInput from './components/ValuesInput';
import Table from './components/Table';
import FiltersActive from './components/FiltersActive';

function App() {
  return (
    <div>
      <FiltersActive />
      <ValuesInput />
      <TextInput />
      <Table />
    </div>
  );
}

export default App;
