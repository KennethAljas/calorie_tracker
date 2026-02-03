const openCalorieView = document.getElementById("openCalorieView")
const calorieView = document.getElementById("calorieView")
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


const proteinCounter = document.getElementById("protein")
const proteinInput = document.getElementById("proteinInput")
let totalProtein = Number(localStorage.getItem("totalProtein")) || 0
proteinCounter.innerHTML = totalProtein + " P"
// Calorie goal, total logic
let calorieCount = Number(localStorage.getItem("calorieCount")) || 0
calorieForm.addEventListener('submit', function (e) {
    e.preventDefault()
    currentGoal = Number(goalAmount.value)
    goalInCircle.textContent = currentGoal
    let addedCalories = Number(calorieAmount.value)
    let addedProtein = Number(proteinInput.value)
    if (!isNaN(addedCalories)) {
        calorieCount++
        localStorage.setItem("calorieCount", calorieCount)

        total += addedCalories
        totalProtein += addedProtein
        proteinCounter.textContent = totalProtein + " P"
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
    localStorage.setItem("totalProtein", totalProtein)

    calorieAmount.value = ''
    proteinInput.value = ''
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
    totalProtein = 0
    proteinCounter.innerHTML = 0 + " P"
    localStorage.removeItem("totalProtein")
    circle.classList.remove("red", "yellow", "green")
    localStorage.removeItem("caloriesHistory")
    historyContainer.innerHTML = ""
    historyContainer.style.display = "none"
    localStorage.removeItem("calorieCount")
    calorieCount = 0
})

// Switch logic
const switchButton = document.getElementById("switch")
const checkmarkAll = document.getElementById("checkmarkAll")
let toggled = false

switchButton.addEventListener("click", () => {
    if (toggled) {
        reset.style.display = "block"
        counterParent.style.display = "block"
        openCalorieView.style.display = "block"
        
        checkmarkAll.style.display = "none"
        taskParent.style.display = "none"
        taskButton.style.display = "none"
        historyContainer.style.display = "block"
    } else {
        reset.style.display = "none"
        counterParent.style.display = "none"
        openCalorieView.style.display = "none"

        checkmarkAll.style.display = "block"
        taskParent.style.display = "flex"
        taskParent.style.flexDirection = "column"
        taskButton.style.display = "block"
        historyContainer.style.display = "none"
    }
    toggled = !toggled
})

// Task logic
const taskView = document.getElementById("taskView")
const taskButton = document.getElementById("addTask")
const taskForm = document.getElementById("taskForm")
const taskInput = document.getElementById("taskInput")
const taskParent = document.getElementById("taskParent")
taskButton.style.display = "none"

// Open task view
taskButton.addEventListener("click", () => {
    blurScreen.style.display = "block"
    taskView.style.display = 'block'
})

document.querySelectorAll(".closeButton").forEach(button => {
    button.addEventListener("click", () => {
        blurScreen.style.display = "none"
        taskView.style.display = 'none'
        calorieView.style.display = 'none'
        editView.style.display = 'none'
    })
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
        <img class="editIcon" src="editIcon.png">
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
        updateCheckmarkAllState()
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

// Checkmark all
const checkmarkAllInput = document.querySelector("#checkmarkAll input")
checkmarkAllInput.addEventListener("change", () => {
    const checked = checkmarkAllInput.checked
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []

    // Update all checkboxes
    document.querySelectorAll(".taskItem input[type='checkbox']").forEach(cb => {
        cb.checked = checked
    })

    // Update localStorage
    const updatedTasks = tasks.map(task => ({
        ...task,
        completed: checked
    }))
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
})

function updateCheckmarkAllState() {
    const checkboxes = document.querySelectorAll(".taskItem input[type='checkbox']")
    const allChecked = [...checkboxes].length > 0 &&
        [...checkboxes].every(cb => cb.checked)

    checkmarkAllInput.checked = allChecked
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
updateCheckmarkAllState()

// Exit views by clicking blur
blurScreen.addEventListener("click", () => {
    blurScreen.style.display = "none"
    calorieView.style.display = 'none'
    taskView.style.display = 'none'
    editView.style.display = 'none'
})

let taskBeingEdited = null
let oldTaskText = null
const editTaskForm = document.getElementById("editTaskForm")
const editTaskInput = document.getElementById("editTaskInput")
const editView = document.getElementById("editView")
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("editIcon")) return

    const taskItem = e.target.closest(".taskItem")
    const input = taskItem.querySelector(".task")

    taskBeingEdited = taskItem
    oldTaskText = input.value

    editTaskInput.value = input.value

    blurScreen.style.display = "block"
    editView.style.display = "block"
})

editTaskForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if (!taskBeingEdited) return

    const newText = editTaskInput.value.trim()
    if (!newText) return

    const taskInputField = taskBeingEdited.querySelector(".task")
    taskInputField.value = newText
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    const updatedTasks = tasks.map(task =>
        task.text === oldTaskText
            ? { ...task, text: newText }
            : task
    )
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))

    taskBeingEdited = null
    oldTaskText = null
    editTaskInput.value = ""
    editView.style.display = "none"
    blurScreen.style.display = "none"
})