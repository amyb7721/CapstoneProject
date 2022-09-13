const workoutList = document.querySelector('#workout-list')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/workouts`

const workoutsCallback = ({ data: workouts }) => displayWorkouts(workouts)
const errCallback = err => console.log(err)

const getAllWorkouts = () => axios.get(baseURL).then(workoutsCallback).catch(errCallback)
const createWorkout = body => axios.post(baseURL, body).then(workoutsCallback).catch(errCallback)
const deleteWorkout = id => axios.delete(`${baseURL}/${id}`).then(workoutsCallback).catch(errCallback)
const addRating = (id, rating) => axios.put(`${baseURL}/${id}`, {rating}).then(workoutsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#name')
    let rate = document.querySelector('#rate')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        rate: rate.value, 
        imageURL: imageURL.value
    }

    createWorkout(bodyObj)

    name.value = ''
    rate.value = ''
    imageURL.value = ''
}

function createsWorkoutPic(workout) {
  console.log(workout)
    const workoutPic = document.createElement('div')
    workoutPic.classList.add('workout-pic')

    workoutPic.innerHTML = `<img alt='workout image' src=${workout.imageURL} class="workout-cover-image"/>
    <p class="name">${workout.name}</p>
    <div id="divRating" class="rating" >
  <span id="spanRatingExcellent" onclick="addRating(${workout.id}, 5)" title="Excellent">☆</span>
  <span id="spanRatingGood" onclick="addRating(${workout.id}, 4)" title="Good">☆</span>
  <span id="spanRatingFair" onclick="addRating(${workout.id}, 3)" title="Fair">☆</span>
  <span id="spanRatingPoor" onclick="addRating(${workout.id}, 2)" title="Poor">☆</span>
  <span id="spanRatingAwful" onclick="addRating(${workout.id}, 1)" title="Awful">☆</span>
</div>

    <button onclick="deleteWorkout(${workout.id})">delete</button>
     `


    workoutList.appendChild(workoutPic)
    
}

function displayWorkouts(arr) {
    workoutList.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createsWorkoutPic(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllWorkouts()




document.getElementById('divRating').addEventListener('click', addRating)















//   if (event.target.tagName.toLowerCase() !== 'span') return;
  
//   if (event.target.classList.contains('rated')) {
//     // event.target.classList.remove('rated');
//   } else {
//     Array.prototype.forEach.call(document.getElementsByClassName('rated'), function(el) {
//       el.classList.remove('rated');
//     });
//     event.target.classList.add('rated');
//   } 






