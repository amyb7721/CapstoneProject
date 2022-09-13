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
    const workoutPic = document.createElement('div')
    workoutPic.classList.add('workout-pic')
    const rating = workout.rate

    workoutPic.innerHTML = `
        <img alt='workout image' src=${workout.imageURL} class="workout-cover-image"/>
        <p class="name">${workout.name}</p>
        <div class="rating" >
            <span class="spanRatingExcellent ${rating === 5 ? 'rated' : ''}" onclick="selectRating(event)" workoutid="${workout.id}" rating="5" title="Excellent">☆</span>
            <span class="spanRatingGood ${rating === 4 ? 'rated' : ''}" onclick="selectRating(event)" workoutid="${workout.id}" rating="4" title="Good">☆</span>
            <span class="spanRatingFair ${rating === 3 ? 'rated' : ''}" onclick="selectRating(event)" workoutid="${workout.id}" rating="3" title="Fair">☆</span>
            <span class="spanRatingPoor ${rating === 2 ? 'rated' : ''}" onclick="selectRating(event)" workoutid="${workout.id}" rating="2" title="Poor">☆</span>
            <span class="spanRatingAwful ${rating === 1 ? 'rated' : ''}" onclick="selectRating(event)" workoutid="${workout.id}" rating="1" title="Awful">☆</span>
        </div>
        <button onclick="deleteWorkout(${workout.id})">delete</button>
    `

    workoutList.appendChild(workoutPic)
}

function selectRating(event) {
    
    const rating = event.target.getAttribute('rating')
    const workoutId = event.target.getAttribute('workoutid')

    if (event.target.tagName.toLowerCase() !== 'span') return

    if (event.target.classList.contains('rated')) {
        event.target.classList.remove('rated')
    } else {
        Array.prototype.forEach.call(document.getElementsByClassName('rated'), function(el) {
            if (el.getAttribute('workoutid') === workoutId) {
                el.classList.remove('rated')
            }
        })
        event.target.classList.add('rated')
    }

    addRating(workoutId, rating)
}

function displayWorkouts(arr) {
    workoutList.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createsWorkoutPic(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllWorkouts()



