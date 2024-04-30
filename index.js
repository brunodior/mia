const express = require('express')
const cors = require('cors') //ajuda a fazer requisicao para o mesmo dominio

const app = express()

// config JSON response
app.use(express.json())



// solve CORS
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

// Public folder for images
app.use(express.static('public'))


// Routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')


app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));