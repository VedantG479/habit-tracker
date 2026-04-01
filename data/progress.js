export let monthlyProgress = JSON.parse(localStorage.getItem('monthlyProgress')) || Array(90).fill(0)
export let habitProgress = new Map(JSON.parse(localStorage.getItem('habitProgress'))) || new Map()

export function changeProgress(habitId, change){
    monthlyProgress[89] += change

    if(!habitProgress.has(habitId)) habitProgress.set(habitId, Array(90).fill(0))
    habitProgress.get(habitId)[89] += change
    saveToStorage()
}

export function addHabitProgress(id){
    habitProgress.set(id, Array(90).fill(0))
    saveToStorage()
}

export function deleteHabitProgress(id, history){
    habitProgress.delete(id)
    for(let i = 0; i <= 89; i++) monthlyProgress[i] -= history[i]
    saveToStorage()
}

export function dayEnd(){
    monthlyProgress.shift()
    habitProgress.forEach((habitProg) => {
        habitProg.shift()
    })
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('monthlyProgress', JSON.stringify(monthlyProgress))
    localStorage.setItem('habitProgress', JSON.stringify([...habitProgress]))
}