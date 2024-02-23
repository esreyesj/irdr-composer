import React from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Typography, Button, TextField,
   FormControl, InputLabel, Select, MenuItem,
    FormHelperText, Box
  } from '@mui/material';
import irdrDataOptions from '../data/data';
const useStyles = makeStyles(() => ({
  jumbotron: {
    padding: '3vw',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
  inputUniqueData:{
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '45%',
    height: '4vw',
    textAlign: 'center',
  },
}));

const IrdrResearch = () => {
  const classes = useStyles();
  const [DataAnalyst, setDataAnalyst] = React.useState('');
  const [outputContent, setOutputContent] = React.useState('');
  const [path, setPath] = React.useState('');
  const [area, setArea] = React.useState('');
  const [error, setError] = React.useState('');
  const irdrData = irdrDataOptions;
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to server
    const today = new Date();
    const output = `${today.toISOString().substring(0, 10)} ICQA DA ${DataAnalyst} ${irdrData[error]}`;
    setOutputContent(output);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setPath(event.target.value);
  };
  const handleSaveClick = () => {
    // Here you can implement the logic to save the content
    console.log(outputContent);
    // For simplicity, I'm just copying to clipboard
    navigator.clipboard.writeText(outputContent)
      .then(() => alert('Content copied to clipboard'))
      .catch((error) => console.error('Failed to copy:', error));
  };
  return (
    <Paper className={classes.jumbotron}>
        <Typography variant="h3" gutterBottom>
        IRDR Composer 
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            display="flex" flexDirection="column">
            <div className={classes.inputUniqueData}>
              <TextField 
                id="da-name" 
                onChange={(e) => setDataAnalyst(e.target.value)}
                label="Data Analyst Login"
                variant="standard" />
            </div>
          </Box>
          <Box>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">Path</InputLabel>
              <Select
                value={path}
                label="Path *"
                onChange={handleChange}
              >
                {irdrData.path.map((path) => (
                  <MenuItem key={path.value} value={path.value}>{path.name}</MenuItem>
                ))} 
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            {path?(
              <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Area</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={area}
                  label="Area *"
                  onChange={(e) => setArea(e.target.value)}
                >
                  {irdrData[path].map((path) => (
                    <MenuItem key={path.value} value={path.value}>{path.name}</MenuItem>
                  ))} 
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            ):null}
            {area?(
              <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Error</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={error}
                  label="Error *"
                  onChange={(e) => setError(e.target.value)}
                >
                  {irdrData[area].map((er) => (
                    <MenuItem key={er.name} value={er.value}>{er.name}</MenuItem>
                  ))} 
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            ):null}
          </Box>
          <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
      
<Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Notes
      </Typography>
      <TextField
        disabled
        multiline
        fullWidth
        rows={5}
        variant="outlined"
        value={outputContent}
        onChange={(e) => setOutputContent(e.target.value)}
      /> 
      <Button variant="contained" color="primary" onClick={handleSaveClick}>
        Copy to Clipboard
      </Button>
    </Paper>

    </Paper>
  );
};

export default IrdrResearch;
