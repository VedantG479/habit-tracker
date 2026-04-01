import { getHabit } from "./data/habit.js"
import { habitProgress } from "./data/progress.js"

const modal = document.querySelector('.modal')
let modalHabitId

export function renderModal(habitId){
    toggleModal()

    let {id, title, currentStreak, bestStreak, totalCompletions, createdAt, daysPassed} = getHabit(habitId)
    modalHabitId = habitId
    let modalContentHtml = `<div class="modal-content" data-habit-id="${id}">
                                <h2>${title}</h2>
                                <div class="stats">
                                    <div>
                                        <p>Current</p>
                                        <h3>${currentStreak} 🔥</h3>
                                    </div>
                                    <div>
                                        <p>Best</p>
                                        <h3>${bestStreak} 🔥</h3>
                                    </div>
                                </div>

                                <div class="info-card">
                                    <p>Total Completions</p>
                                    <h3>${totalCompletions}</h3>
                                </div>

                                <div class="info-card activity">
                                    <p>Activity</p>
                                    <div class="heatmap-large">
                                    ${renderHeatMapActivity(id)}
                                    </div>
                                </div>

                                <div class="details">
                                    <div>
                                    <p>Completion Rate</p>
                                    <h4>${((totalCompletions * 100)/daysPassed).toFixed()}%</h4>
                                    </div>
                                    <div>
                                    <p>Created On</p>
                                    <h4>${createdAt}</h4>
                                    </div>
                                </div>
                                <button class="delete-btn">Delete</button>
                                <button class="close-btn">Close</button>
                            </div>`
    modal.innerHTML = modalContentHtml
}

export function toggleModal(){
    modal.classList.toggle('show')
    let id = modalHabitId
    modalHabitId = null
    return id
}

function renderHeatMapActivity(id){
    let habitProgressArray = habitProgress.get(id)
    let activityHTML = ""
    for(let i = 0; i < habitProgressArray.length; i++){
        if(habitProgressArray[i] > 0) activityHTML += `<div class='active'></div>`
        else    activityHTML += "<div></div>"
    }
    return activityHTML
}