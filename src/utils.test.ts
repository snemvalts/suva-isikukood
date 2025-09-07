import { describe, expect, it } from 'vitest'
import { getFirstDigit, getPersonalCode, getSequenceNumber } from './utils'

describe('getFirstDigit', () => {


  it('returns correct first digit for males', () => {
    expect(getFirstDigit('M', '1800-01-01')).toBe('1')
    expect(getFirstDigit('M', '1850-06-15')).toBe('1')
    expect(getFirstDigit('M', '1899-12-31')).toBe('1')

    expect(getFirstDigit('M', '1900-01-01')).toBe('3')
    expect(getFirstDigit('M', '1950-07-20')).toBe('3')
    expect(getFirstDigit('M', '1999-12-31')).toBe('3')

    expect(getFirstDigit('M', '2000-01-01')).toBe('5')
    expect(getFirstDigit('M', '2050-03-15')).toBe('5')
    expect(getFirstDigit('M', '2099-12-31')).toBe('5')

    expect(getFirstDigit('M', '2100-01-01')).toBe('7')
    expect(getFirstDigit('M', '2150-09-10')).toBe('7')
    expect(getFirstDigit('M', '2199-12-31')).toBe('7')
  })


  it('returns correct first digit for females', () => {
    expect(getFirstDigit('F', '1800-01-01')).toBe('2')
    expect(getFirstDigit('F', '1850-06-15')).toBe('2')
    expect(getFirstDigit('F', '1899-12-31')).toBe('2')

    expect(getFirstDigit('F', '1900-01-01')).toBe('4')
    expect(getFirstDigit('F', '1950-07-20')).toBe('4')
    expect(getFirstDigit('F', '1999-12-31')).toBe('4')

    expect(getFirstDigit('F', '2000-01-01')).toBe('6')
    expect(getFirstDigit('F', '2050-03-15')).toBe('6')
    expect(getFirstDigit('F', '2099-12-31')).toBe('6')

    expect(getFirstDigit('F', '2100-01-01')).toBe('8')
    expect(getFirstDigit('F', '2150-09-10')).toBe('8')
    expect(getFirstDigit('F', '2199-12-31')).toBe('8')
  })
})


describe('getSequenceNumber', () => {
  it('generates correct sequence number', () => {
    expect(getSequenceNumber(0)).toBe('000')
    expect(getSequenceNumber(1)).toBe('001')
    expect(getSequenceNumber(11)).toBe('011')
    expect(getSequenceNumber(111)).toBe('111')
  })

  it('generates random number with correct length', () => {
    expect(/^\d\d\d$/.test(getSequenceNumber())).toBe(true)
  })
})


describe('getPersonalCode', () => {
  it('generates code with desired sequence number', () => {
    expect(getPersonalCode('M', '1999-07-05', 275)).toBe('39907052754')

    expect(getPersonalCode('M', '1899-07-05', 0)).toBe('19907050006')
    expect(getPersonalCode('M', '1999-07-05', 0)).toBe('39907050008')
    expect(getPersonalCode('M', '2000-07-05', 0)).toBe('50007050009')
    expect(getPersonalCode('M', '2100-07-05', 0)).toBe('70007050000')

    expect(getPersonalCode('F', '1899-07-05', 0)).toBe('29907050007')
    expect(getPersonalCode('F', '1999-07-05', 0)).toBe('49907050009')
    expect(getPersonalCode('F', '2000-07-05', 0)).toBe('60007050002')
    expect(getPersonalCode('F', '2100-07-05', 0)).toBe('80007050001')
  })

  it('generates code without desired sequence number', () => {
    expect(getPersonalCode('M', '1999-07-05').includes('3990705')).toBe(true)
  })
})
