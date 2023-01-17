
function TimeDateSort(a, b) {
    const compare = (a, b) => {
        return parseInt(a) - parseInt(b)
    }

    const aTime = a.timeRemaining.split(":")
    const bTime = b.timeRemaining.split(":")
    for (let i = 0; i < aTime.length; i++) {
        if (compare(aTime[i], bTime[i])) {
            return compare(aTime[i], bTime[i])
        }
    }
    return 0
}

export default TimeDateSort