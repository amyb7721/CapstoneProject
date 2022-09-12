const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())  
app.use(cors())



 const {
    getWorkouts, 
    deleteWorkout, 
    createWorkout, 
    updateWorkout
} = require("./controller.js")

app.get('/api/workouts', getWorkouts)
app.delete('/api/workouts/:id', deleteWorkout)
app.post('/api/workouts', createWorkout)
app.put('/api/workouts/:id', updateWorkout)


app.listen(4004, () => console.log('Server running on port 4004'))