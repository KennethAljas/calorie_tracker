const openCalorieView = document.getElementById("openCalorieView")
const calorieView = document.getElementById("calorieView")
const closeCalorieView = document.getElementById("closeCalorieView")
const addCalories = document.getElementById("addCalories")

openCalorieView.addEventListener('click', function (e) {
    calorieView.style.display = 'block'
})

closeCalorieView.addEventListener('click', function (e) {
    calorieView.style.display = 'none'
})

addCalories.addEventListener('click', function (e) {
    calorieView.style.display = 'none'
})