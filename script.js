const openCalorieView = document.getElementById("openCalorieView")
const calorieView = document.getElementById("calorieView")
const closeCalorieView = document.getElementById("closeCalorieView")
const calorieForm = document.getElementById("calorieForm")
const calorieAmount = document.getElementById("calorieAmount")
const counter = document.getElementById("counter")
const reset = document.getElementById("resetCalories")
const circle = document.getElementById("circle")
const goalAmount = document.getElementById("goalInput")
const setGoalButton = document.getElementById("setGoal")
const goalInCircle = document.getElementById("goal")

let total = 0
let currentGoal = 0

openCalorieView.addEventListener('click', function (e) {
    let addedGoal = Number(goalAmount.value)
    counter.innerHTML = total

    calorieView.style.display = 'block'
})

closeCalorieView.addEventListener('click', function (e) {
    calorieView.style.display = 'none'
})

calorieForm.addEventListener('submit', function (e) {
    e.preventDefault()
    currentGoal = Number(goalAmount.value)
    goalInCircle.textContent = currentGoal
    let addedCalories = Number(calorieAmount.value)
    if (!isNaN(addedCalories) && addedCalories > 0) {
        total += addedCalories
        counter.textContent = total
    }

    // Calculate percentage AFTER updating total
    const percentage = (total / currentGoal) * 100

    // Remove all previous classes
    circle.classList.remove("red", "yellow", "green")

    // Apply colors based on percentage
    if (percentage >= 0) {
        circle.classList.add("red")
    }
    if (percentage >= 50) {
        circle.classList.add("yellow")
    }
    if (percentage >= 100) {
        circle.classList.add("green")
    }

    calorieAmount.value = ''
    calorieView.style.display = 'none'
})

reset.addEventListener('click', function (e) {
    counter.innerHTML = 0
    total = 0
    circle.classList.remove("red", "yellow", "green")
})