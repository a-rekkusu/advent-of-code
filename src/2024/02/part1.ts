export function executePart1(input: string[]): number {
    const records = input.map((record) => record.split(' '))

    let safeCount = 0
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < records.length; i++) {
        let isRecordSafe = true
        let isAscending = null
        for (let j = 1; j < records[i].length - 1; j++) {
            const safeResult = isSafeLevel(+records[i][j - 1], +records[i][j], isAscending)
            if (!safeResult.isSafe) { 
                isRecordSafe = false 
                break
            }
            isAscending = safeResult.isAscending
        }
        if (isRecordSafe) ++safeCount
    }
    console.log(safeCount)

    return 0
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