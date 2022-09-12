const workoutList = document.querySelector('#workout-list')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/workouts`

const workoutsCallback = ({ data: workouts }) => displayWorkouts(workouts)
const errCallback = err => console.log(err)

const getAllWorkouts = () => axios.get(baseURL).then(workoutsCallback).catch(errCallback)
const createWorkout = body => axios.post(baseURL, body).then(workoutsCallback).catch(errCallback)
const deleteWorkout = id => axios.delete(`${baseURL}/${id}`).then(workoutsCallback).catch(errCallback)
const updateWorkout = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(workoutsCallback).catch(errCallback)

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
    const workoutPic = document.createElement('div')
    workoutPic.classList.add('workout-pic')

    workoutPic.innerHTML = `<img alt='workout image' src=${workout.imageURL} class="workout-cover-image"/>
    <p class="name">${workout.name}</p>
    <div id="divRating" class="rating">
  <span id="spanRatingExcellent" title="Excellent">☆</span>
  <span id="spanRatingGood" title="Good">☆</span>
  <span id="spanRatingFair" title="Fair">☆</span>
  <span id="spanRatingPoor" title="Poor">☆</span>
  <span id="spanRatingAwful" title="Awful">☆</span>
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




document.getElementById('divRating').addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() != 'span') return;
  
  if (event.target.classList.contains('rated')) {
    event.target.classList.remove('rated');
  } else {
    Array.prototype.forEach.call(document.getElementsByClassName('rated'), function(el) {
      el.classList.remove('rated');
    });
    event.target.classList.add('rated');
  } 
});





