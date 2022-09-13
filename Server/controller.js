const workouts = require('./db.json')
let globalId = 4

module.exports = {
    getWorkouts: (req, res) => {
        res.status(200).send(workouts)
    },
    deleteWorkout: (req, res) => {
        let index = workouts.findIndex((workout) => {
            return workout.id === +req.params.id
        })
        workouts.splice(index, 1)
        res.status(200).send(workouts)
    },
    createWorkout: (req, res) => {
        let {name, rate, imageURL} = req.body
        let newWorkout = {
            id: globalId,
            name,
            rate,
            imageURL
        }
        workouts.push(newWorkout)
        res.status(200).send(workouts)
        globalId++
    },
    addRating: (req, res) => {
        console.log('hit update workout')
        let {id} = req.params
        let {rating} = req.body
        let index = workouts.findIndex((workout) => {
            return +workout.id === +id
            }) 
        
        //  update workout rating to the rating that im destrucring from body
        let newRating = {
           
        }
        workouts.push(newRating)
        res.status(200).send(workouts)
        } 
    }
    
        // 
    

