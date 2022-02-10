const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express()
const port = 5000  //changing to 5000 as 3000 will be used by the React app

app.use(express.json())  //this is a middleware reqd so that we can access req.body in our models. this allows to send rwquests in JSON format
//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



app.get('/', (req, res) => {
  res.send('Hello Kuljeet!')
})

// app.get('/kk', (req, res) => {
//     res.send('Hello kk!')
//   })
  

app.listen(port, () => {
  console.log(`My Notes listening on port ${port}`)
})