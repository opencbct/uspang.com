import React, { useState, useEffect, useRef} from 'react';
import Loading from './loading.gif';
//import logo from './logo.svg';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const fetchPhotos = async (pageNumber) => {
    const Access_Key = "chFcslwh6GpF1FV3vWjOn4ojVI8sKv-K68Oi20j0nX8"
    const res = await fetch('https://api.unsplash.com/photos/?client_id=${Access_Key}&page=$[pageNumber}$per_page=10')
    const data = await res.json()
    console.log(data)
    setPhotos(p => [...p, ...data])
    setLoading(true)
  }

  useEffect(()=>{
    fetchPhotos(pageNumber);
  },[pageNumber])

  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  }

  const pageEnd = useRef()
  let num = 1;
  
  useEffect(()=>{
    if(laoding){
      const observer = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
          num++;
          loadMore();
          if(num >= 10){
            observer.unobserve(pageEnd.current)
          }
      }

      },{threshold: 1});
      observer.observe(pageEnd.current)

    } 

  },[loading,num])

  return (
    <div className="App">
      <h1>pajamas Dog</h1>
      {
        photos.map((photos, index) =>(
          <div> className="photos" key={index}
            <img src={photos.urls.small} alt=""/>
            <p>{photos.user.first_name + '' + photos.user.last_name}</p>
            <span>Like: {photos.user.total_likes}</span>
          </div>
        ))
      }
      <div className="loading">     
        <img src={Loading} alt=""/>
      </div> 

      <h3>{photos.length}</h3>

      <button onClick={loadMore} ref={pageEnd}>
        Load More
      </button>
    </div>
  );
}

export default App;
