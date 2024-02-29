import { OrchidDto } from '@data/orchid/orchid.dto'
import '@view/assets/styles/home/orchid-card.scss'

interface OrchidCardProps {
  orchid: OrchidDto
}

export default function OrchidCard({ orchid }: OrchidCardProps) {

  return (
    <div className='card'>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <img src={orchid.image} alt={orchid.name} />
        </figure>
      </div>
      <div className='card-content'>
        <div className='content'>
          <p className='title is-5'>{orchid.name}</p>
          <p className='title is-6'>{orchid.category?.name}</p>
        </div>
      </div>
    </div>
  )
}
