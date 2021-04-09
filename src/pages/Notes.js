import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Container} from '@material-ui/core';
import Masonry from 'react-masonry-css';

import NoteCard from '../components/NoteCard';
import firebase from './../firebase/firebase';


export default function Notes() {

  const [notes, setNotes] = useState([]);

  useEffect(() =>{
    
    const itemsRef = firebase.database().ref('notes');
    itemsRef.on('value', (snapshot) =>{
        let items = snapshot.val();
        let newState = [];
        for(let item in items){
            newState.push({
                id:item,
                title:items[item].title,
                details:items[item].details,
                category:items[item].category
            })
        }
          setNotes(newState)
        })
        return () =>{
          setNotes({});
        }
  }, [])





  const handleDelete = (id) => {
    
    const notesRef = firebase.database().ref(`/notes/${id}`);

    notesRef.remove();

    
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
