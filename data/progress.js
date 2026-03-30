export let progressList = new Map()
for(let i = 1; i<= 31; i++) progressList.set(i, 0)

export function changeProgress(day, change){
    progressList.set(day, progressList.get(day) + change)
}