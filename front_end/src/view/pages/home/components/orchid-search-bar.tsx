import { memo, useEffect } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SEARCH_WAITING_DURATION = 500

let searchTimeout: NodeJS.Timeout

interface OrchidSearchBarProps {
  onSearch: (value: string) => void
}

export default memo(function OrchidSearchBar({ onSearch }: OrchidSearchBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      onSearch(event.target.value)
    }, SEARCH_WAITING_DURATION)
  }

  useEffect(() => {
    return clearTimeout(searchTimeout)
  }, [])

  return (
    <div className='field'>
      <p className='control has-icons-right'>
        <input className='input is-rounded' type='text' placeholder='Orchid name' onChange={handleChange} />
        <span className='icon is-small is-right'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </p>
    </div>
  )
})
