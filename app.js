const express = require('express')
const app = express()
const port = 3000

var routes = require('./Routes/routes.js')
var AuthController = require('./Controllers/AuthController');
app.use('/api/auth', AuthController);

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})