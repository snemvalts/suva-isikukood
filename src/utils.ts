import { format, parseISO } from 'date-fns'

export type Gender = 'M' | 'F'



export const isValidBirthYear = (birthdate: string) => {
  const birthYear = parseISO(birthdate).getFullYear()

  return birthYear >= 1800 && birthYear < 2200
}



export const getFirstDigit = (gender: Gender, birthdate: string) => {
  if (!isValidBirthYear(birthdate)) {
    throw new Error('Invalid birth year')
  }

  const birthYear = parseISO(birthdate).getFullYear()

  const centuriesSince1800 = Math.floor((birthYear - 1800) / 100)
  const amountToAddToBaseDigit = (centuriesSince1800 * 2)

  if (gender === 'M') {
    return (1 + amountToAddToBaseDigit).toString()
  }


  return (2 + amountToAddToBaseDigit).toString()
}


export const getSequenceNumber = (sequenceNumber: number = Math.floor(Math.random() * 1000)) => {
  if (sequenceNumber < 0) {
    throw new Error('Sequence number less than zero')
  }

  if (sequenceNumber >= 1000) {
    throw new Error('Sequence greater than zero')
  }

  let zeroPrefixPaddingSize: number
  if (sequenceNumber <= 1) {
    zeroPrefixPaddingSize = 2
  } else {
    zeroPrefixPaddingSize = 3 - Math.ceil(Math.log10(sequenceNumber))
  }

  const zeroPrefixPadding = Array.from(Array(zeroPrefixPaddingSize)).map(() => '0').join('')

  return zeroPrefixPadding + Math.floor(sequenceNumber).toString()
}



export const getPersonalCode = (gender: Gender, birthdate: string, desiredSequenceNumber?: number) => {
  const firstDigit = getFirstDigit(gender, birthdate)
  const date = format(parseISO(birthdate), 'yyMMdd')

  const sequenceNumber = getSequenceNumber(desiredSequenceNumber)


  const codeWithoutCheckNumber = `${firstDigit}${date}${sequenceNumber}`
  const checkNumber = getControlNumber(codeWithoutCheckNumber)

  return `${codeWithoutCheckNumber}${checkNumber}`
}


// adapted from https://github.com/dknight/Isikukood-js/blob/master/src/isikukood.ts
const getControlNumber = (code = '') => {
  const mul1: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1]
  const mul2: number[] = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3]
  let controlNum: number = 0
  let total: number = 0

  for (let i = 0; i < 10; ++i) {
    total += Number(code.charAt(i)) * mul1[i]
  }
  controlNum = total % 11

  total = 0
  if (controlNum === 10) {
    for (let i = 0; i < 10; ++i) {
      total += Number(code.charAt(i)) * mul2[i]
    }
    controlNum = total % 11
    if (10 === controlNum) {
      controlNum = 0
    }
  }
  return controlNum.toString()
}
