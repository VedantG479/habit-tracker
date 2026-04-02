export let monthlyProgress = JSON.parse(localStorage.getItem('monthlyProgress')) || Array(90).fill().map(() => ({habitCompleted: 0, totalHabits: 0}))
export let habitProgress = new Map(JSON.parse(localStorage.getItem('habitProgress'))) || new Map()

export function changeProgress(habitId, change){
    monthlyProgress[89].habitCompleted += change

    if(!habitProgress.has(habitId)) habitProgress.set(habitId, Array(90).fill(0))
    habitProgress.get(habitId)[89] += change
    saveToStorage()
}

export function addHabitProgress(id){
    habitProgress.set(id, Array(90).fill(0))
    monthlyProgress[89].totalHabits++
    saveToStorage()
}

export function deleteHabitProgress(id, history, daysHabit){
    habitProgress.delete(id)
    for(let i = 0; i <= 89; i++)    monthlyProgress[i].habitCompleted -= history[i]
    
    for(let i = 89; i >= 0 && daysHabit > 0; i--){
        monthlyProgress[i].totalHabits--
        daysHabit--
    }
    saveToStorage()
}

export function dayEnd(){
    monthlyProgress.shift()
    monthlyProgress.push({
        habitCompleted: 0,
        totalHabits: 0
    })

    habitProgress.forEach((habitProg) => {
        habitProg.shift()
        habitProg.push(0)
    })
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('monthlyProgress', JSON.stringify(monthlyProgress))
    localStorage.setItem('habitProgress', JSON.stringify([...habitProgress]))
}