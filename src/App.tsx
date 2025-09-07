import { useMemo, useState } from 'react'
import './App.css'
import { formatISO, isValid } from 'date-fns'
import { getPersonalCode, isValidBirthYear, type Gender } from './utils'

function App() {
  const [date, setDate] = useState<string>(
    formatISO(new Date(), { representation: 'date' })
  )

  const [sequenceNumber, setSequenceNumber] = useState<number | null>(null)
  const [gender, setGender] = useState<Gender>('M')

  const personalCode = useMemo(
    () =>
      date && isValidBirthYear(date)
        ? getPersonalCode(gender, date, sequenceNumber ?? undefined)
        : '---',
    [date, gender, sequenceNumber]
  )

  return (
    <>
      <div></div>
      <h1>Suva isikukood</h1>

      <label htmlFor="birthdate">Sugu (M/N)</label>
      <div>
        <select
          name="gender"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value as Gender)}
        >
          <option value="M">M</option>
          <option value="F">N</option>
        </select>
      </div>

      <div>
        <label htmlFor="birthdate">Sünnikuupäev (1800-2199)</label>
        <div>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            min="1800-01-01"
            max="2199-12-31"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="sequenceNumber">Järjekorranumber (valikuline)</label>
          <div>
            <input
              type="number"
              id="sequenceNumber"
              name="sequenceNumber"
              min="0"
              max="999"
              value={sequenceNumber?.toString()}
              onChange={(e) =>
                setSequenceNumber(
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
            />
          </div>
        </div>

        <h2>Isikukood:</h2>
        <h2>{personalCode}</h2>
      </div>
    </>
  )
}

export default App
