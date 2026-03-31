import { renderHabits } from "../home.js"
import { renderInsights } from "../insights.js"
import { habitProgress } from "./progress.js"

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
        precentProgress: 0,
        daysPassed: 1
    })
    habitProgress.set(id, Array(31).fill(0))
    saveToStorage()
}

export function deleteHabit(id){
    habitList = habitList.filter((habit) => habit.id !== id)
    habitProgress.delete(id)
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
    habit.precentProgress = ((habit.totalCompletions * 100)/habit.daysPassed).toFixed()
    saveToStorage()
}

export function unFinishHabit(id){
    let habit = getHabit(id)
    habit.currentStreak--
    habit.today = false
    if(habit.currentBest)   habit.bestStreak--
    habit.totalCompletions--
    habit.precentProgress = ((habit.totalCompletions * 100)/habit.daysPassed).toFixed()
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
        if(habit.today) habit.today = false
        else{
            habit.currentStreak = 0
            habit.currentBest = false
            habit.today = false
        }
        habit.precentProgress = ((habit.totalCompletions * 100)/habit.daysPassed).toFixed()
    })
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('habitList', JSON.stringify(habitList))
    renderHabits()
    renderInsights()
}