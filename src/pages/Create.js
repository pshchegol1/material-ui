import React , { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { FormControlLabel, makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from 'react-router';


const useStyles = makeStyles({
  field:{
      marginTop: 20,
      marginBottom: 20, 
      display: 'block'
  }
});

export default function Create() {

  const classes = useStyles();

  const history = useHistory();

  // Set titles and details
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  // Display Errors
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  // Set category
  const [category, setCategory] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    if(title == '')
    {
      setTitleError(true);
    }
 

    if(details == '')
    {
      setDetailsError(true);
    }
  

    if(title && details)
    {
      fetch('https://react-material-ui-notes.netlify.app/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.parse(JSON.stringify({title, details, category})) 
      }).then(() => history.push('/'))
    }


  }

  return (
    <Container>
      
      <Typography variant = "h6" component="h2" gutterBottom color="textSecondary">
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
        onChange={(e) => setTitle(e.target.value)}
        className={classes.field}
        label="Note Title" 
        variant="outlined" 
        color="secondary" 
        fullWidth 
        required
        error={titleError}
        />

       <TextField 
         onChange={(e) => setDetails(e.target.value)}
        className={classes.field}
        label="Details" 
        variant="outlined" 
        color="secondary" 
        multiline
        rows={4}
        fullWidth 
        required
        error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio/>} label="Money" />
            <FormControlLabel value="todos" control={<Radio/>} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio/>} label="Reminders" />
            <FormControlLabel value="work" control={<Radio/>} label="Work" />
          </RadioGroup>
        </FormControl>
        <Button 
        variant="contained" 
        color="secondary" 
        type="submit"
        endIcon={<KeyboardArrowRightIcon/>}>
          Submit
        </Button>
     </form>
      
    </Container>
  )
}
