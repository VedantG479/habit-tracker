export let monthlyProgress = JSON.parse(localStorage.getItem('monthlyProgress')) || Array(31).fill(0)
export let habitProgress = new Map(JSON.parse(localStorage.getItem('habitProgress'))) || new Map()

export function changeProgress(habitId, change){
    monthlyProgress[30] += change

    if(!habitProgress.has(habitId)) habitProgress.set(habitId, Array(31).fill(0))
    habitProgress.get(habitId)[30] += change
    saveToStorage()
}

export function dayEnd(){
    monthlyProgress.shift()
    habitProgress.forEach((habitProg) => {
        habitProg.shift()
    })
}

function saveToStorage(){
    localStorage.setItem('monthlyProgress', JSON.stringify(monthlyProgress))
    localStorage.setItem('habitProgress', JSON.stringify([...habitProgress]))
}