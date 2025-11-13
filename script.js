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
let calorieCount = Number(localStorage.getItem("calorieCount")) || 0
calorieForm.addEventListener('submit', function (e) {
    e.preventDefault()
    currentGoal = Number(goalAmount.value)
    goalInCircle.textContent = currentGoal
    let addedCalories = Number(calorieAmount.value)
    if (!isNaN(addedCalories)) {
        
        if (calorieCount >= 25) {
        alert("Too many calories!")
        return
        }
        calorieCount++
        localStorage.setItem("calorieCount", calorieCount)

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
    localStorage.removeItem("calorieCount")
    calorieCount = 0
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
let taskCount = JSON.parse(localStorage.getItem("tasks"))?.length || 0
taskForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if (taskCount >= 20) {
        alert("Too many tasks!")
        return
    }
    taskCount++
    localStorage.setItem("taskCount", taskCount)

    const taskText = taskInput.value.trim()
    if (!taskText) return

    const taskData = { text: taskText, completed: false }
    const task = createTaskElement(taskData)
    taskParent.appendChild(task)

    // Save to localStorage
    saveTask(taskData)

    // Reset UI
    blurScreen.style.display = "none"
    taskView.style.display = "none"
    taskInput.value = ""
})

// Create a new DOM element for a task
function createTaskElement(taskData) {
    const { text, completed } = taskData
    const task = document.createElement("div")
    task.className = "taskItem"

    task.innerHTML = `
        <button class="deleteTask">
            <span class="X2"></span>
            <span class="Y2"></span>
        </button>
        <input class="task" value="${text}" disabled>
        <label class="container">
            <input type="checkbox" ${completed ? "checked" : ""}>
            <svg viewBox="0 0 64 64" height="2em" width="2em">
                <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 
                A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 
                A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 
                H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" 
                class="path"></path>
            </svg>
        </label>
    `

    // Delete task
    const deleteBtn = task.querySelector(".deleteTask")
    deleteBtn.addEventListener("click", () => {
        task.remove()
        deleteTask(text)
        taskCount--
        localStorage.setItem("taskCount", taskCount)
    })

    // Checkbox logic
    const checkbox = task.querySelector("input[type='checkbox']")
    checkbox.addEventListener("change", () => {
        toggleTaskCompletion(text, checkbox.checked)
    })

    return task
}

// Save a task to localStorage
function saveTask(taskData) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.push(taskData)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Delete a task from localStorage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks = tasks.filter(task => task.text !== taskText)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Toggle completion state
function toggleTaskCompletion(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    const updatedTasks = tasks.map(task =>
        task.text === taskText ? { ...task, completed } : task
    )
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
}

// Load all saved tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach(taskData => {
        const task = createTaskElement(taskData)
        taskParent.appendChild(task)
    })
}
loadTasks()