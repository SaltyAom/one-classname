import hash from '../src'

import { oneDigitCache, twoDigitCache, threeDigitCache } from './libs'

describe('Caching', () => {
    beforeAll(oneDigitCache)

    it('should cache className', () => {
        expect(hash('1')).toBe('b')
    })
})

describe('One digit className', () => {
    beforeAll(oneDigitCache)

    it("should generate 'a' at index 0", () => {
        expect(hash('0')).toBe('a')
    })

    it("should generate 'b' at index 1", () => {
        expect(hash('1')).toBe('b')
    })

    it("should generate 'z' at index 25", () => {
        expect(hash('25')).toBe('z')
    })

    it("should generate 'A' at index 26", () => {
        expect(hash('26')).toBe('A')
    })

    it("should generate 'B' at index 27", () => {
        expect(hash('27')).toBe('B')
    })

    it("should generate 'Z' at index 51", () => {
        expect(hash('51')).toBe('Z')
    })
})

describe('Two digit claassName', () => {
    beforeAll(twoDigitCache)

    it("should generate 'aa' at index 52", () => {
        expect(hash('52')).toBe('aa')
    })

    it("should generate 'ab' at index 53", () => {
        expect(hash('53')).toBe('ab')
    })

    it("should generate 'az' at index 77", () => {
        expect(hash('77')).toBe('az')
    })

    it("should generate 'aA' at index 78", () => {
        expect(hash('78')).toBe('aA')
    })

    it("should generate 'aB' at index 79", () => {
        expect(hash('79')).toBe('aB')
    })

    it("should generate 'aZ' at index 103", () => {
        expect(hash('103')).toBe('aZ')
    })

    it("should generate 'ba' at index 104", () => {
        expect(hash('104')).toBe('ba')
    })

    it("should generate 'ZZ' at index 2755", () => {
        expect(hash('2755')).toBe('ZZ')
    })
})

describe('Three digit claassName', () => {
    beforeAll(threeDigitCache)

    it("should generate 'aaa' at index 2756", () => {
        expect(hash('2756')).toBe('aaa')
    })

    it("should generate 'aab' at index 2757", () => {
        expect(hash('2757')).toBe('aab')
    })

    it("should generate 'aaZ' at index 2807", () => {
        expect(hash('2807')).toBe('aaZ')
    })

    it("should generate 'aba' at index 2808", () => {
        expect(hash('2808')).toBe('aba')
    })

    it("should generate 'aZZ' at index 5459", () => {
        expect(hash('5459')).toBe('aZZ')
    })

    it("should generate 'baa' at index 5460", () => {
        expect(hash('5460')).toBe('baa')
    })

    it("should generate 'bab' at index 5460", () => {
        expect(hash('5461')).toBe('bab')
    })

    it("should generate 'ZZZ' at index 143362", () => {
        expect(hash('143363')).toBe('ZZZ')
    })
})
