export function executePart2(input: string[]): number {
    const records = input.map((record) => record.split(' '))

    let safeCount = 0
    for (const record of records) {
        let isRecordSafe = true
        let problemIndex = null
        let isAscending = null
        for (let j = 1; j < record.length; j++) {
            const previous = problemIndex !== null ? +record[problemIndex - 1] : +record[j - 1]
            const safeResult = isSafeLevel(previous, +record[j], isAscending)
            if (!safeResult.isSafe) {
                if (!problemIndex) {
                    problemIndex = j
                    continue
                 } 
                    
                isRecordSafe = false
                break
            }
            isAscending = safeResult.isAscending
        }
        if (isRecordSafe) ++safeCount
    }

    return safeCount
}

function isSafeLevel(previous: number, current: number, isAscending: boolean | null) : { isAscending: boolean | null; isSafe: boolean}  {
    if (isAscending) {
        if (isSafeAscending(previous, current)) return { isAscending: true, isSafe: true }
        return { isAscending: null, isSafe: false}
    } else if (isAscending === false) {
        if (isSafeDescending(previous, current)) return { isAscending: false, isSafe: true }
        return { isAscending: null, isSafe: false}
    } else {
        if (isSafeAscending(previous, current)) return { isAscending: true, isSafe: true }
        if (isSafeDescending(previous, current)) return { isAscending: false, isSafe: true }
        return { isAscending: null, isSafe: false}
    }
}

function isSafeAscending(previous: number, current: number): boolean {
    if (previous < current && current - previous <= 3) return true
    return false
}

function isSafeDescending(previous: number, current: number): boolean {
    if (previous > current && previous - current <= 3) return true
    return false
}