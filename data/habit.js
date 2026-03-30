export let habitList = [{
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    title: 'Cold Shower',
    today: false,
    currentBest: true,
    currentStreak: 0, 
    bestStreak: 0,
    totalCompletions: 0, 
    precentProgress: 0
}, {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    title: 'Gym Workout',
    today: false,
    currentBest: true,
    currentStreak: 0, 
    bestStreak: 0,
    totalCompletions: 0, 
    precentProgress: 0
}, {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    title: 'Read a Book',
    today: false,
    currentBest: true,
    currentStreak: 0, 
    bestStreak: 0,
    totalCompletions: 0, 
    precentProgress: 0
}]

export function addHabit(title){
    habitList.push({
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        title,
        today: false,
        currentBest: true,
        currentStreak: 0,
        bestStreak: 0,
        totalCompletions: 0,
        precentProgress: 0
    })
}

export function deleteHabit(id){
    habitList = habitList.filter((habit) => habit.id !== id)
}

export function finishHabit(id){ //sort habits based on completion percent
    let habit = getHabit(id)
    habit.currentStreak += 1
    if(habit.currentStreak > habit.bestStreak){
        habit.bestStreak = habit.currentStreak
        habit.currentBest = true
    }
    habit.totalCompletions++
}

export function unFinishHabit(id){
    let habit = getHabit(id)
    habit.currentStreak--
    if(habit.currentBest)   habit.bestStreak--
    habit.totalCompletions--
}

export function getHabit(id){
    let matchingHabit
    habitList.forEach((habit) => {
        if(habit.id === id) matchingHabit = habit
    })
    return matchingHabit
}