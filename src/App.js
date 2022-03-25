
import React, { lazy, Suspense } from 'react';
import './App.css';

const PhotosComponent = lazy(() => import('./searchPhotos'));
const renderLoader = () => <p>Loading</p>;

function App() {
  return (
    <div className="App">
     
 <div className="container">
        <h4 className="title">Search Photos </h4>
        <Suspense fallback={renderLoader()}>
          <PhotosComponent /> 
        </Suspense>
        </div>
    </div>
  );
}
export default App;