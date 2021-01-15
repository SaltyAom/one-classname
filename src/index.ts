const styleMap: Record<string, string> = {}
let index = 0

const generateUniqueStyleHash = (value: string) => {
    if (styleMap[value]) return styleMap[value]

    let hash = ''
    let localindex = index

    let genDivisor = () => 52 ** hash.length
    let genDecrement = () => 52 ** (hash.length + 1)

    while (localindex >= 0) {
        let charCode = Math.floor(localindex / genDivisor()) % 52

        localindex = localindex - genDecrement()

        // a-z and A-Z otherwise start new className
        if (charCode < 26) hash += String.fromCharCode(97 + charCode)
        else hash += String.fromCharCode(65 + charCode - 26)
    }

    hash = hash.split('').reverse().join('')

    styleMap[value] = hash
    index++

    return hash
}

export default generateUniqueStyleHash