import { renderHabits } from "../home.js"
import { renderInsights } from "../insights.js"
import { addHabitProgress, deleteHabitProgress} from "./progress.js"

export let habitList = JSON.parse(localStorage.getItem('habitList')) || []

export function addHabit(title){
    let id = crypto.randomUUID()
    habitList.push({
        id,
        createdAt: new Date().toDateString(),
        title,
        today: false,
        currentBest: true,
        currentStreak: 0,
        bestStreak: 0,
        totalCompletions: 0,
        daysPassed: 1, 
        history: Array(90).fill(0)
    })
    addHabitProgress(id)
    saveToStorage()
}

export function deleteHabit(id){
    let habit = getHabit(id)
    deleteHabitProgress(id, habit.history, habit.daysPassed)
    habitList = habitList.filter((habit) => habit.id !== id)
    saveToStorage()
}

export function finishHabit(id){ 
    let habit = getHabit(id)
    habit.currentStreak++
    habit.today = true
    if(habit.currentStreak > habit.bestStreak){
        habit.bestStreak = habit.currentStreak
        habit.currentBest = true
    }
    habit.totalCompletions++
    habit.history[89]++
    saveToStorage()
}

export function unFinishHabit(id){
    let habit = getHabit(id)
    habit.currentStreak--
    habit.today = false
    if(habit.currentBest)   habit.bestStreak--
    habit.totalCompletions--
    habit.history[89]--
    saveToStorage()
}

export function getHabit(id){
    let matchingHabit
    habitList.forEach((habit) => {
        if(habit.id === id) matchingHabit = habit
    })
    return matchingHabit
}

export function dayEnded(){
    habitList.forEach((habit) => {
        habit.daysPassed++
        habit.history.shift()
        if(habit.today) habit.today = false
        else{
            habit.currentStreak = 0
            habit.currentBest = false
            habit.today = false
        }
    })
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('habitList', JSON.stringify(habitList))
    renderHabits()
    renderInsights()
}