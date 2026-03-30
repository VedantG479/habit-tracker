import { habitList } from "./data/habit.js"
import { progressList } from "./data/progress.js"
import { daysInCurrentMonth, now } from "./home.js"

const activityCard = document.querySelector('.grid')
const weeklyBars = document.querySelector('.bars')
const topHabitsCard = document.querySelector('.top-habits')

export function renderInsights(){
    renderActivityGrid()
    renderWeeklyProgress()
    renderTopHabits()
}

function renderActivityGrid(){
    let activityHTML = ""
    for(let i = 0; i < daysInCurrentMonth; i++){
        if(progressList.get(i + 1) > 0){
            activityHTML += `<div class='active'></div>`
        }
        else    activityHTML += "<div></div>"
    }
    activityCard.innerHTML = activityHTML
}

function renderWeeklyProgress(){
    let currentDate = now.getDate()
    let weeklyHTML = ""
    for(let i = 13; i >=0; i--){
        let date = currentDate - i
        if(date < 1){
            let daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
            date += daysInPrevMonth
        }

        let height = progressList.get(i + 1) * 10
        weeklyHTML += `<div style="height:${height}%"></div>`
    }
    weeklyBars.innerHTML = weeklyHTML
}

function renderTopHabits(){
    let topHabitsHtml = '<p class="title">Top Performing Habits</p>'
    for(let i = 0; i < habitList.length && i < 5; i++){
        const {title, precentProgress, bestStreak} = habitList[i]
        topHabitsHtml += `<div class="top-item">
                            <div class="left">
                            <div class="rank">1</div>
                            <div class="info">
                                <span class="name">${title}</span>
                                <span class="sub">${bestStreak} days streak</span>
                            </div>
                            </div>
                            <div class="percent green">${precentProgress}%</div>
                        </div>`
    }
    topHabitsCard.innerHTML = topHabitsHtml
}