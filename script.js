const openCalorieView = document.getElementById("openCalorieView")
const calorieView = document.getElementById("calorieView")
const closeCalorieView = document.getElementById("closeCalorieView")
const addCalories = document.getElementById("addCalories")
const calorieAmount = document.getElementById("calorieAmount")
const counter = document.getElementById("counter")
const reset = document.getElementById("resetCalories")

let total = 0

openCalorieView.addEventListener('click', function (e) {
    calorieView.style.display = 'block'
})

closeCalorieView.addEventListener('click', function (e) {
    calorieView.style.display = 'none'
})

addCalories.addEventListener('click', function (e) {
    let addedCalories = Number(calorieAmount.value)
    if (!isNaN(addedCalories) && addedCalories > 0) {
        total += addedCalories
        counter.innerHTML = total
    }

    calorieAmount.value = ''
    calorieView.style.display = 'none'
})

reset.addEventListener('click', function (e) {
    counter.innerHTML = 0
    total = 0
})