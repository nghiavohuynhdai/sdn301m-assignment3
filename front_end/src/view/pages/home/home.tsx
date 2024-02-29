import { useEffect, useState } from 'react'
import OrchidList from './components/orchid-list'
import { getAllOrchids } from '@data/orchid/orchid-api'
import { OrchidDto } from '@data/orchid/orchid.dto'
import OrchidSearchBar from './components/orchid-search-bar'

export default function Home() {
  const [orchids, setOrchids] = useState<OrchidDto[]>([])
  const [search, setSearch] = useState<string>('')

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  useEffect(() => {
    const getData = async () => {
      const orchid = search ? await getAllOrchids(search) : await getAllOrchids()
      setOrchids(orchid)
    }

    getData()
    return () => {}
  }, [search])

  /*
   * TODO: Search bar
   */

  return (
    <div className='section'>
      <OrchidSearchBar onSearch={handleSearch} />
      <OrchidList orchids={orchids} />
    </div>
  )
}
