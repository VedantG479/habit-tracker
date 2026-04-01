import { addHabit, dayEnded, deleteHabit, finishHabit, habitList, unFinishHabit } from "./data/habit.js";
import { changeProgress, dayEnd } from "./data/progress.js";
import { renderInsights } from "./insights.js";
import { renderModal, toggleModal } from "./modal.js";

let now = new Date();
let daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
const dateStrip = document.querySelector('.date-strip')
const habitsList = document.querySelector('.habit-list')
let modalVisible = false;
let midnightTimer = null

renderInsights()
renderCalendar()
renderHabits()
scheduleMidnightRefresh();

document.body.addEventListener('click', (e) => {
    if(e.target.closest('.habit-card')){
        const habitCard = e.target.closest('.habit-card')
        const habitId = habitCard.dataset.habitId
        
        if(e.target.closest('.checkbox'))   toggleHabit(habitCard, habitId)
        else{
            renderModal(habitId)
            modalVisible = true
        }
    }
    else if(e.target.closest('.add-habit')){
        const addHabitCard = e.target.closest('.add-habit')
        addHabitCard.classList.add('active')
    }
    else if(e.target.closest('.close-btn')){
        toggleModal()
        modalVisible = false;
    }
    else if(e.target.closest('.delete-btn')){
        let habitToDelete = toggleModal()
        deleteHabit(habitToDelete)
        modalVisible = false;
    }
    else{
        if(modalVisible){
            toggleModal()
            modalVisible = false
        }
        else    addNewHabit()
    }   
})

document.body.addEventListener('keydown', (e) => {
    if(e.key == 'Enter')    addNewHabit()
})

export function renderHabits(){
    let habitsHTML = ''
    habitList.forEach(({id, title, today, currentStreak}) => {
        habitsHTML += `<div class="habit-card ${today ? 'completed': ''}" data-habit-id=${id}>
                            <div class="left">
                            <div class="checkbox ${today ? 'checked' : ''}"></div>
                            <span>${title}</span>
                            </div>
                            <div class="streak">${currentStreak} 🔥</div>
                        </div>`
    })
    habitsList.innerHTML = habitsHTML + `<div class="add-habit">
                                            <span class="placeholder">+ Add Habit</span>
                                            <input 
                                                type="text" 
                                                class="habit-input" 
                                                placeholder="Enter habit..." 
                                                maxlength="20"
                                            />
                                        </div>`
}

function renderCalendar(){
    let currentDate = now.getDate()
    let dateStripHtml = ""
    let firstDate = false
    for(let i = 4; i >= -2; i--){
        let date = currentDate - i
        
        if(date < 1){
            let daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
            date += daysInPrevMonth
        }
        else if(date > daysInCurrentMonth){
            date -= daysInCurrentMonth
        }
        if(date == 1 && firstDate)   dateStripHtml += `<span class='bar'> | </span>`
        dateStripHtml += `<span ${i==0 ? `class=active` : ``}>${date}</span>`
        firstDate = true
    }
    dateStrip.innerHTML = dateStripHtml
}

function toggleHabit(habitCard, habitId){
    const habitCheck = habitCard.querySelector('.checkbox')
    if(habitCheck.classList.contains('checked')){
        changeProgress(habitId, -1)
        unFinishHabit(habitId)
    }
    else{
        changeProgress(habitId, 1)
        finishHabit(habitId)
    }
}

function addNewHabit(){
    const addHabitCard = document.querySelector('.add-habit')
    if(addHabitCard.classList.contains('active')){
        const habitInput = addHabitCard.querySelector('.habit-input').value
        if(habitInput.trim())   addHabit(habitInput.trim())
    }
    addHabitCard.classList.remove('active')
}

function scheduleMidnightRefresh() {
    if (midnightTimer) clearTimeout(midnightTimer);
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    const msToMidnight = midnight.getTime() - now.getTime();

    midnightTimer = setTimeout(() => {
        updateCalendarUI(); 
        scheduleMidnightRefresh();
    }, msToMidnight);
}

let currentDay = new Date().getDate();
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        const now = new Date();
        if (now.getDate() !== currentDay) {
            currentDay = now.getDate();
            updateCalendarUI();
            
            scheduleMidnightRefresh();
        }
    }
});

function updateCalendarUI() {
    console.log("Day ended. Refreshing calendar...");
    dayEnded()
    dayEnd()
    renderCalendar()
}