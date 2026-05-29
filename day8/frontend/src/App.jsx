import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
  const [notes, setnotes] = useState([])

  function fetchdata(){

    axios.get("http://localhost:3000/api/notes")
      .then(res=>{
        console.log(res.data.note)
        setnotes(res.data.note);
      })
  }
  useEffect(()=>{
    fetchdata()
  },[])

  function handlesubmit(e){
    e.preventDefault()

    const { title, description}=e.target.elements;
    console.log(title.value,description.value)

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then(res=>{
      console.log(res.data)
      fetchdata()
    })

  }

  function handleDeleteNote(noteId){
    axios.delete("https://cohort-2-0-m32u.onrender.com/api/notes/"+noteId)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  return (
    <div>

      <form className='create_note' onSubmit={handlesubmit}>
        <input name='title' type="text" placeholder='title' />
        <input name='description' type="text" placeholder='dewscription' />
        <button>create note</button>
      </form>


      <div className="notes">
        {
          notes.map(note => {
            return (
              <div className="note">
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                 <button onClick={()=>{handleDeleteNote(note._id)}} >delete</button>
              </div>
            )
          })
        }
      </div>
        
    
    </div>
  )
}

export default App
