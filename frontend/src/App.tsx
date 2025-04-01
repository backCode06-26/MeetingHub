import React from 'react';
import './App.css';
import Nav from './component/Nav';
import Main from './component/Main';

function App() {
  return (
    <div className="App">
      <Nav isLoggedIn={false}></Nav>
      <Main></Main>
    </div>
  );
}

export default App;
