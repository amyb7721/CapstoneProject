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
    updateWorkout: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        let index = workouts.findIndex((workout) => {
            return +workout.id === +id
            }) 
         if (workouts[index].rate <= 5 && type === 'minus') {
             workouts[index].rate = 0
                res.status(200).send(workouts)
            } else if (type === 'plus') {
                workouts[index].rate += 5
                res.status(200).send(workouts)
            } else if (type === 'minus') {
                workouts[index].rate -= 5
                res.status(200).send(workouts)
            } else {
                res.sendStatus(400)
            }
        } 
    }
    
        
    

