import { getHabit, habitList } from "./data/habit.js"
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
    let habitsProgressUI = []

    for(let i = 0; i < habitList.length; i++){
        const {id, totalCompletions, daysPassed} = habitList[i]
        let progress = Number(((totalCompletions * 100)/daysPassed).toFixed())
        
        habitsProgressUI.push({progress, id})
    }

    habitsProgressUI.sort((a, b) => b.progress - a.progress)
        .slice(0, 5) 
        .forEach((item, index) => {
            let habit = getHabit(item.id)
            const {title, bestStreak} = habit

            let habitsHTML = `<div class="top-item">
                            <div class="left">
                                <div class="rank">${index + 1}</div>
                                <div class="info">
                                    <span class="name">${title}</span>
                                    <span class="sub">${bestStreak} days streak</span>
                                </div>
                            </div>
                            <div class="percent ${percentColor(item.progress)}">${item.progress}%</div>
                        </div>`
            topHabitsHtml += habitsHTML
        })
    topHabitsCard.innerHTML = topHabitsHtml
}

function percentColor(progress){
    if(progress < 50)   return 'red'
    else if(progress <= 75)  return 'yellow'
    return 'green'
}
