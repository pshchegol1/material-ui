import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Container} from '@material-ui/core';
import Masonry from 'react-masonry-css';

import NoteCard from '../components/NoteCard'


export default function Notes() {

  const [notes, setNotes] = useState([]);

  useEffect(() =>{
      fetch('https://react-material-ui-notes.netlify.app/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    await fetch('https://react-material-ui-notes.netlify.app/notes/' + id, {
      method: 'DELETE'
    })

    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  } 

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry 
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        >
      
        {notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        ))}
     </Masonry>
    </Container>
  )
}
