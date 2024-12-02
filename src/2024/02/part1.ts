export function executePart1(input: string[]): number {
    const records = input.map((record) => record.split(' '))

    let safeCount = 0
    for (const record of records) {
        let isRecordSafe = true
        let isAscending = null
        for (let j = 1; j < record.length; j++) {
            const safeResult = isSafeLevel(+record[j - 1], +record[j], isAscending)
            if (!safeResult.isSafe) { 
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
    if (isAscending === null) {
        if (previous < current && current - previous <= 3) return { isAscending: true, isSafe: true }
        if (previous > current && previous - current <= 3) return { isAscending: false, isSafe: true }
        return { isAscending: null, isSafe: false}
    }
    
    if (isAscending) {
        if (previous < current && current - previous <= 3) return { isAscending: true, isSafe: true }
        return { isAscending: null, isSafe: false}
    } else {
        if (previous > current && previous - current <= 3) return { isAscending: false, isSafe: true }
        return { isAscending: null, isSafe: false}
    }
}