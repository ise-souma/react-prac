import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Gallery from './Gallery.tsx'
import { Profile } from './Profile.tsx'

/*
export default function App() {
  return (
    <Gallery />
  )
}
  */

export default function TodoList(){
  return (
    <div>
      <h1> Todo </h1>
      <img
        src = "https://share.google/v9LinWLX9ChVjMRtT"
        alt = "nanka"
        className = "photo"
      />
      <ul>
        <li>Invent new</li>
        <li>reherrse</li>
      </ul>
    </div>
  );
}