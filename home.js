import { finishHabit, habitList, unFinishHabit } from "./data/habit.js";
import { renderInsights } from "./insights.js";

export let now = new Date();
export let daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
const dateStrip = document.querySelector('.date-strip')
const habitsList = document.querySelector('.habit-list')

renderInsights()
renderCalendar()
renderHabits()

document.body.addEventListener('click', (e) => {
    if(e.target.closest('.habit-card')){
        const habitCard = e.target.closest('.habit-card')
        const habitId = habitCard.dataset.habitId
        
        const habitCheck = habitCard.querySelector('.checkbox')
        if(habitCheck.classList.contains('checked')){
            habitCheck.classList.remove('checked')
            habitCard.classList.remove('completed')
            unFinishHabit(habitId)
        }
        else{
            habitCheck.classList.add('checked')
            habitCard.classList.add('completed')
            finishHabit(habitId)
        }
    }
})

function renderHabits(){
    let habitsHTML = ''
    habitList.forEach(({id, title, currentStreak}) => {
        habitsHTML += `<div class="habit-card" data-habit-id=${id}>
                            <div class="left">
                            <div class="checkbox"></div>
                            <span>${title}</span>
                            </div>
                            <div class="streak">${currentStreak} 🔥</div>
                        </div>`
    })
    habitsList.innerHTML = habitsHTML + `<div class="habit-card add">
                                            <span>+  Add Habit</span>
                                        </div>`
}

function renderCalendar(){
    let currentDate = now.getDate()
    let dateStripHtml = ""
    for(let i = 4; i >= -2; i--){
        let date = currentDate - i
        
        if(date < 1){
            let daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
            date += daysInPrevMonth
        }
        else if(date > daysInCurrentMonth){
            date -= daysInCurrentMonth
        }
        dateStripHtml += `<span ${i==0 ? `class=active` : ``}>${date}</span>`
    }
    dateStrip.innerHTML = dateStripHtml
}