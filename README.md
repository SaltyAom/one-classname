![npm](https://img.shields.io/npm/v/1-classname)![npm bundle size](https://img.shields.io/bundlephobia/minzip/1-classname)

[![forthebadge](https://forthebadge.com/images/badges/contains-cat-gifs.svg)](https://forthebadge.com)[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
## 1-classname
Generate one digit classname and beyond.

## Why
Instead of using traditional css classname hashing which created unnecessary long className, using one digit classname strategy reduce className to only 1 byte.
|                  | hashing                                | example                  | byte / class    |
|------------------|----------------------------------------|--------------------------|-----------------|
| traditional hash | [path][name]__[local]--[hash:base64:5] | cssmain__anyLocal--YWtkd | at least 8 byte |
| one digit        | [a-Z]                                  | a                        | 1               |

Let's say if average tranditional hash has an average length of 16 and there's about 300 classes and id is used:
```typescript
// Traditional Hash
16 * 300 // 4,800 byte used

// one digit hash
( 52 * 1 ) / ( (300 - 52) * 2) // 548 byte used

// For further explaination, please visit 'one digit hashing' section below.
```
By using 1-classname, we reduce byte used by classname alone by 8.75x

<img width="420" src="https://media1.tenor.com/images/c3ee30261a7eaf29c6ea0f2fa8e89055/tenor.gif?itemid=18001082" alt="Happy Fox" />

### Note
Although traditional css classname ensure that className will never be duplicated, using 'one classname' (this module) you have to make sure that className will never be duplicated by yourself.
You might wanted to use traditional hash then use one className to shorten it as the following:
```typescript
import hash from '1-clasname'

hash(`${getPathAndNameAndClassNameSomehow()}`) // cssmain__anyLocal--YWtkd => a
```

Now we 100% unique one digit className and decrease bundle size.

## One digit hashing
[One digit](https://dev.to/denisx/reduce-bundle-size-via-one-letter-css-classname-hash-strategy-10g6) is strategy to reduce long hash className to 1 digit only.
If all one digit is used, it will use 2 digits and so on.
Note: Although, theotically we can use one digit for all className (ex: emoji, ASCII character), we want to follow [w3 standard](https://www.w3.org/TR/CSS2/syndata.html) for className.
Which means it not really always one digit but always valid w3 standard one digit.

This will helps reduce long className into short one thus reduce a lot of bundle size.

The sequence can be describe as the following:
| range       | digit | possible classname |
|-------------|-------|--------------------|
| 1-52        | 1     | a-Z                |
| 53-2756     | 2     | aa-ZZ              |
| 2757-243363 | 3     | aaa-ZZZ            |
| and so on   | n     | n([a-Z])           |

or illustration as example as the following:
| index     | 0 | 1 | 2 | 3 | 25 | 26 | 27 | 51 | 52 | 53 | 78 | 79 | 103 | 104 | 105 | 2755 | 2756 | 2757 | 143362 |
|-----------|---|---|---|---|----|----|----|----|----|----|----|----|-----|-----|-----|------|------|------|--------|
| character | a | b | c | d | z  | A  | B  | Z  | aa | ab | aA | aB | aZ  | ba  | bb  | ZZ   | aaa  | aab  | ZZZ    |


As the range goes on, it can be describe by using fibonacci sequence as the following:
```typescript
const generateLimit = (digits: number) => {
    if (digits === 0) return 0

    return 52 ** digits + generateLimit(digits - 1)
}

const limit = generateLimit(digits) - (digits - 1)
```

When the className is hash, it'll be stored as key in object as the following:
```typescript
{
    [key-1]: "a",
    [key-2]: "b"
    [key-3]: "c"
}
```

Which means when the class is called after the second time, it will not generate new className but rather using old one.

## Getting started
Simply install with yarn or npm.
```bash
yarn add 1-classname

// or with npm
npm install 1-classname
```

One classname has built-in TypeScript supports which means no `@types/1-classname` is need.

## Usage
This library is designed to be used with `localIdentName` of css-loader.

The following code demonstrate how to reduce className of `.module.sass` file.
```typescript
cssLoaderOptions: {
    getLocalIdent: (
        loaderContext,
        localIdentName,
        localName,
        options
    ) => {
        const filePath = loaderContext.resourcePath
        const fileBaseName = basename(filePath)

        if (/\.module\.sass$/.test(fileBaseName)) {
            const modulePathParts = filePath.split('/')

            const moduleName =
                modulePathParts[modulePathParts.length - 2]

            return `_${oneClassName(moduleName + localName)}`
        }

        return localName
    }
}
```

If you want prefix you can use template literal:
```typescript
generateLocalIdentSomehow: (string) => `${generatePrefixSomehow()}-${hash(string)}`,
```

## Contribution
All contribution, discussion and PR is welcome.

If you have any questions, feels free to ask at [issue](https://github.com/saltyaom/one-classname/issues)
