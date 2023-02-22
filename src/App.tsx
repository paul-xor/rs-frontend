
import React from 'react';
import './App.css';
import { MuiNavbar } from './components/MuiNavbar';
import SearchReservation from './components/SearchReservation';


function App() {
  return (
    <div className="App">
      <MuiNavbar/>
      <div style={{ marginTop: '2em' }}>
        <SearchReservation />
      </div>
    </div>
  );
}

export default App;
