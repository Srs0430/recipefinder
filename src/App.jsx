import './App.css';
import React from 'react';
import RecipeInfo from './components/RecipeInfo';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <RecipeInfo />
    </div>
  );
}

export default App;
