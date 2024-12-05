export function executePart2(input: string[]): number {
    const records = input.map((record) => record.split(' '))

    let safeCount = 0
    for (const record of records) {
        let isRecordSafe = true
        let problemIndex = null
        let isAscending = null
        for (let j = 1; j < record.length; j++) {
            let previous = +record[j - 1]
            if (problemIndex !== null && j === problemIndex + 1) previous = +record[problemIndex - 1]
            const safeResult = isSafeLevel(previous, +record[j], isAscending)
            isAscending = safeResult.isAscending
            if (!safeResult.isSafe) {
                if (!problemIndex) {
                    problemIndex = j
                    if (j === 1) isAscending = null
                    continue
                 } 
                    
                isRecordSafe = false
                break
            }
        }

        if (problemIndex) {
            let isMutationSafe = false
            if (!isRecordSafe) isMutationSafe = isRecordSafeMutation(record, 0)
            if (problemIndex !== 2 && problemIndex !== 1)
                isMutationSafe = isRecordSafeMutation(record, problemIndex - 1)
            
            if (isMutationSafe || isRecordSafe) ++safeCount
            continue
        }
        if (isRecordSafe) ++safeCount
    }

    return safeCount
}

function isRecordSafeMutation(record: string[], problemIndex: number): boolean {
    let isRecordSafe = true
    let isAscending = null
    const startIndex = problemIndex === 0 ? 2 : 1
    for (let j = startIndex; j < record.length; j++) {
        let previous = +record[j - 1]
        if (j === problemIndex + 1)
            previous = +record[problemIndex === 0 ? 0 : problemIndex - 1]
        
        const safeResult = isSafeLevel(previous, +record[j], isAscending)
        isAscending = safeResult.isAscending
        if (!safeResult.isSafe) {
            if (!problemIndex) {
                problemIndex = j
                if (j === 1) isAscending = null
                continue
                } 
                
            isRecordSafe = false
            break
        }
    }
    return isRecordSafe
}

function isSafeLevel(previous: number, current: number, isAscending: boolean | null) : { isAscending: boolean | null; isSafe: boolean}  {
    if (isAscending) {
        if (isSafeAscending(previous, current)) return { isAscending, isSafe: true }
        return { isAscending, isSafe: false}
    } else if (isAscending === false) {
        if (isSafeDescending(previous, current)) return { isAscending, isSafe: true }
        return { isAscending, isSafe: false}
    } else {
        if (isSafeAscending(previous, current)) return { isAscending: true, isSafe: true }
        if (isSafeDescending(previous, current)) return { isAscending: false, isSafe: true }
        return { isAscending, isSafe: false}
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