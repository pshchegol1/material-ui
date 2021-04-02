import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, IconButton, makeStyles, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { lightBlue, lightGreen, purple, teal } from '@material-ui/core/colors';

const useStyles = makeStyles({
    border: {
        border: (note) =>{
            if(note.category == 'work')
            {
                return '1px solid #7FFFD4'
            }
            if(note.category == 'reminders')
            {
                return '1px solid #8A2BE2'
            }
            if(note.category == 'todos')
            {
                return '1px solid #7FFF00'
            }
            if(note.category == 'money')
            {
                return '1px solid lightBlue'
            }
        }
    },
    avatar: {
        backgroundColor: (note) =>{
            if(note.category == 'work')
            {
                return teal[500]
            }
            if(note.category == 'reminders')
            {
                return purple[700]
            }
            if(note.category == 'todos')
            {
                return lightGreen[500]
            }
            if(note.category == 'money')
            {
                return lightBlue[500]
            }
        }
    }
});

export default function NoteCard({note, handleDelete})
{
    const classes = useStyles(note);

    return(
        <div>
          <Card elevation={1} className={classes.border}>
              <CardHeader
              avatar={
                  <Avatar className={classes.avatar}>
                      {note.category[0].toUpperCase()}
                  </Avatar>
              }
              action={
                <IconButton onClick={() => handleDelete(note.id)}>
                <DeleteOutlined />
                </IconButton>
              }
              title={note.title}
              subheader={note.category}
              />
              <CardContent>
                  <Typography variant="body2" color="textSecondary">
                      {note.details}
                  </Typography>
              </CardContent>
          </Card>
        </div>
    )
}