import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App(){
  const defaultMovieList = [
    {
      id:1,
      name:"君の名は",
      image:
        "https://media.themoviedb.org/t/",
      overview:
        "1ヶ月後に1000年ぶりの彗星"
    },
    {
      id:2,
      name:"ハウル",

    },
    {
      id:3,
      name:"もののけ",
    },
    {
      id:4,
      name:"バック",
    },
  ];

  const [keyword, setKeyword] = useState("");

  return (
    <div>
      <div>{keyword}</div>
      <input type = 'text' onChange={(e) => setKeyword(e.target.value)}/>
      {defaultMovieList
        .filter((movie) => movie.name.includes(keyword))
        .map((movie)=>(
          <div key = {movie.id}>
            <h2>{movie.name}</h2>
            <p>{movie.overview}</p>
          </div>
      ))}
    </div>
  )
}

export default App