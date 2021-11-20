import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { Header } from './components';
import { MainPage, FormPage, DetailsPage } from './pages';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/announcement/:id' element={<DetailsPage/>}/>
          <Route path='/Form' element={<FormPage/>}/>
        </Routes>    
    </div>
  );
}

export default App;
