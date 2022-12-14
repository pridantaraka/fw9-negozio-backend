require('dotenv').config();
const express = require('express');

global.__basepath = __dirname;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/images' ,express.static('assets'));
//for route server

app.use('/admin', require('./src/routes/serverAdmin'));
app.use('/', require('./src/routes/serverClient'));

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Our server is running now',
  });
});

app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,

    message: 'Resource not found !!! Something wrong...',
  });
});

const portServer = process.env.PORT;
app.listen(portServer, () => {
  console.log(`Server running on port: ${portServer}`);
});
