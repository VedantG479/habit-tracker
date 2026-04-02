import { habitList } from "./data/habit.js"
import { monthlyProgress } from "./data/progress.js"

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
    for(let i = 0; i < monthlyProgress.length; i++){
        if(monthlyProgress[i].habitCompleted > 0) activityHTML += `<div class='active'></div>`
        else    activityHTML += "<div></div>"
    }
    activityCard.innerHTML = activityHTML
}

function renderWeeklyProgress(){
    let weeklyHTML = ""
    for(let i = 13; i >=0; i--){
        let height = 1
        const {habitCompleted, totalHabits} = monthlyProgress[89 - i]
        if(totalHabits != 0 && habitCompleted != 0)   height = ((habitCompleted/totalHabits)*100).toFixed()
    
        weeklyHTML += `<div style="height:${Math.min(height, 100)}%"></div>`
    }
    weeklyBars.innerHTML = weeklyHTML
}

function renderTopHabits(){
    let topHabitsHtml = '<p class="title">Top Performing Habits</p>'
    for(let i = 0; i < habitList.length && i < 5; i++){
        const {title, precentProgress, bestStreak, totalCompletions, daysPassed} = habitList[i]
        let progress = ((totalCompletions * 100)/daysPassed).toFixed()

        topHabitsHtml += `<div class="top-item">
                            <div class="left">
                                <div class="rank">${i + 1}</div>
                                <div class="info">
                                    <span class="name">${title}</span>
                                    <span class="sub">${bestStreak} days streak</span>
                                </div>
                            </div>
                            <div class="percent ${percentColor(progress)}">${progress}%</div>
                        </div>`
    }
    topHabitsCard.innerHTML = topHabitsHtml
}

function percentColor(progress){
    if(progress < 50)   return 'red'
    else if(progress <= 75)  return 'yellow'
    return 'green'
}
