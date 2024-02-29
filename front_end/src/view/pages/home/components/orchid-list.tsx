import { OrchidDto } from '@data/orchid/orchid.dto'
import OrchidCard from './orchid-card'
import { Link } from 'react-router-dom'

interface OrchidListProps {
  orchids: OrchidDto[]
}

export default function OrchidList({ orchids }: OrchidListProps) {
  return (
    <div className='block'>
      <div className='columns is-multiline'>
        {orchids.map((orchid) => (
          <div className='column is-one-quarter' key={orchid.slug}>
            <Link to={`orchids/${orchid.slug}`}>
              <OrchidCard orchid={orchid} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
