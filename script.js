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

// Set calorie total and goal from storage
let total = Number(localStorage.getItem("total")) || 0
let currentGoal = Number(localStorage.getItem("currentGoal")) || 0
let color = localStorage.getItem("color")
circle.classList.add(color)
counter.innerHTML = total
goalInCircle.textContent = currentGoal
goalAmount.value = currentGoal

// Open calorie view
openCalorieView.addEventListener('click', function (e) {
    calorieView.style.display = 'block'
})

// Close calorie view
closeCalorieView.addEventListener('click', function (e) {
    calorieView.style.display = 'none'
})

// Calorie goal and total add logi
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
    let color = "red"
    if (percentage >= 50) {
        color = "yellow";
    }
    if (percentage >= 100) {
        color = "green"
    }

    circle.classList.add(color)
    localStorage.setItem("color", color)
    localStorage.setItem("total", total)
    localStorage.setItem("currentGoal", currentGoal)

    calorieAmount.value = ''
    calorieView.style.display = 'none'
})

// Reset calorie total
reset.addEventListener('click', function (e) {
    counter.innerHTML = 0
    total = 0
    localStorage.setItem("total", total)
    localStorage.removeItem("color")
    circle.classList.remove("red", "yellow", "green")
})