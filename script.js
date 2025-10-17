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
const blurScreen = document.getElementById("blur")
const historyContainer = document.getElementById("historyContainer")
const counterParent = document.getElementById("counterParent")

// Set calorie total and goal from storage
let total = Number(localStorage.getItem("total")) || 0
let currentGoal = Number(localStorage.getItem("currentGoal")) || 0
let color = localStorage.getItem("color")
circle.classList.add(color)
counter.innerHTML = total
goalInCircle.textContent = currentGoal
goalAmount.value = currentGoal
reloadHistory()

function reloadHistory() {
    const savedHistory = JSON.parse(localStorage.getItem('caloriesHistory')) || []
    savedHistory.forEach(calories => {
        historyContainer.style.display = "block"
        const historyBlock = document.createElement('div')
        historyBlock.textContent = `+${calories} cal`
        historyContainer.appendChild(historyBlock)
    })
}

// Open calorie view
openCalorieView.addEventListener('click', function (e) {
    blurScreen.style.display = "block"
    calorieView.style.display = 'block'
})

// Close calorie view
closeCalorieView.addEventListener('click', function (e) {
    blurScreen.style.display = "none"
    calorieView.style.display = 'none'
})

// Calorie goal and total add logi
calorieForm.addEventListener('submit', function (e) {
    e.preventDefault()
    currentGoal = Number(goalAmount.value)
    goalInCircle.textContent = currentGoal
    let addedCalories = Number(calorieAmount.value)
    if (!isNaN(addedCalories)) {
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
    blurScreen.style.display = "none"
    calorieView.style.display = 'none'

    historyContainer.style.display = "block"
    const newDiv = document.createElement("div")
    newDiv.textContent = '+' + addedCalories + ' cal'
    historyContainer.appendChild(newDiv)

    const caloriesHistory = JSON.parse(localStorage.getItem('caloriesHistory')) || []
    caloriesHistory.push(addedCalories)
    localStorage.setItem('caloriesHistory', JSON.stringify(caloriesHistory))
})

// Reset calorie total
reset.addEventListener('click', function (e) {
    blurScreen.style.display = "none"
    counter.innerHTML = 0
    total = 0
    localStorage.setItem("total", total)
    localStorage.removeItem("color")
    circle.classList.remove("red", "yellow", "green")
    localStorage.removeItem("caloriesHistory")
    historyContainer.innerHTML = ""
    historyContainer.style.display = "none"
})

// Switch logic
const switchButton = document.getElementById("switch")
let toggled = false

switchButton.addEventListener("click", () => {
    if (toggled) {
        reset.style.display = "block"
        counterParent.style.display = "block"
        openCalorieView.style.display = "block"

        taskParent.style.display = "none"
        taskButton.style.display = "none"
    } else {
        reset.style.display = "none"
        counterParent.style.display = "none"
        openCalorieView.style.display = "none"

        taskParent.style.display = "flex"
        taskParent.style.flexDirection = "column"
        taskButton.style.display = "block"
    }
    toggled = !toggled
})

// Task logic
const taskView = document.getElementById("taskView")
const taskButton = document.getElementById("addTask")
const taskForm = document.getElementById("taskForm")
const taskInput = document.getElementById("taskInput")
const taskParent = document.getElementById("taskParent")
const closeTaskView = document.getElementById("closeTaskView")
taskButton.style.display = "none"

// Open task view
taskButton.addEventListener("click", () => {
    blurScreen.style.display = "block"
    taskView.style.display = 'block'
})

// Close task view
closeTaskView.addEventListener('click', function () {
    blurScreen.style.display = "none"
    taskView.style.display = 'none'
})

// Task form
taskForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const task = document.createElement("div")
    task.className = "taskItem"

    task.innerHTML = `
    <input class="task" value="${taskInput.value}">
    <label class="container">
        <input type="checkbox">
        <svg viewBox="0 0 64 64" height="2em" width="2em">
        <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" 
                pathLength="575.0541381835938" class="path"></path>
        </svg>
    </label>
    `

    taskParent.appendChild(task)

    blurScreen.style.display = "none"
    taskView.style.display = "none"
    taskInput.value = ""
})