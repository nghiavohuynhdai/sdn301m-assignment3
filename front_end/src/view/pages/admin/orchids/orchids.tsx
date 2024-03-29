import { getAllOrchids } from '@data/orchid/orchid-api'
import { OrchidDto } from '@data/orchid/orchid.dto'
import { useCallback, useEffect, useState } from 'react'
import CreateOrchidModal from './components/create-orchid-modal'
import UpdateOrchidModal from './components/update-orchid-modal'
import DeleteOrchidModal from './components/delete-orchid-modal'
import ViewOrchidModal from './components/view-orchid-modal'

export default function Orchids() {
  const [orchids, setOrchids] = useState<OrchidDto[]>([])
  const [viewOrchidModal, setViewOrchidModal] = useState(false)
  const [createOrchidModal, setCreateOrchidModal] = useState(false)
  const [updateOrchidModal, setUpdateOrchidModal] = useState(false)
  const [selectedOrchidSlug, setSelectedOrchidSlug] = useState<string>('')
  const [deleteOrchidModal, setDeleteOrchidModal] = useState(false)

  const getData = useCallback(async () => {
    const orchid = await getAllOrchids()
    setOrchids(orchid)
  }, [])

  useEffect(() => {
    getData()
    return () => {}
  }, [getData])

  const handleViewButton = (orchidSlug: string) => {
    setSelectedOrchidSlug(orchidSlug)
    setViewOrchidModal(true)
  }

  const handleEditButton = (orchidSlug: string) => {
    setSelectedOrchidSlug(orchidSlug)
    setUpdateOrchidModal(true)
  }

  const handleDeleteButton = (orchidSlug: string) => {
    setSelectedOrchidSlug(orchidSlug)
    setDeleteOrchidModal(true)
  }

  const handleCreateSuccess = async () => {
    await getData()
    setCreateOrchidModal(false)
  }

  const handleUpdateSuccess = async () => {
    await getData()
    setSelectedOrchidSlug('')
    setUpdateOrchidModal(false)
  }

  const handleDeleteSuccess = async () => {
    await getData()
    setSelectedOrchidSlug('')
    setDeleteOrchidModal(false)
  }

  return (
    <>
      <button className='button is-primary' onClick={() => setCreateOrchidModal(true)}>
        Create
      </button>
      <table className='table is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orchids.map((orchid, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <figure className='image is-4by3'>
                  <img src={orchid.image} alt={orchid.name} />
                </figure>
              </td>
              <td>{orchid.name}</td>
              <td>{orchid.category?.name}</td>
              <td>
                <div className='buttons'>
                  <button className='button is-info' onClick={() => handleViewButton(orchid.slug)}>
                    View
                  </button>
                  <button className='button is-primary' onClick={() => handleEditButton(orchid.slug)}>
                    Edit
                  </button>
                  <button className='button is-danger' onClick={() => handleDeleteButton(orchid.slug)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {createOrchidModal && (
        <CreateOrchidModal
          isOpen={createOrchidModal}
          onClose={() => setCreateOrchidModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
      {selectedOrchidSlug && (
        <ViewOrchidModal
          isOpen={viewOrchidModal}
          orchidSlug={selectedOrchidSlug}
          onClose={() => {
            setSelectedOrchidSlug('')
            setViewOrchidModal(false)
          }}
        />
      )}
      {selectedOrchidSlug && (
        <UpdateOrchidModal
          isOpen={updateOrchidModal}
          orchidSlug={selectedOrchidSlug}
          onClose={() => {
            setSelectedOrchidSlug('')
            setUpdateOrchidModal(false)
          }}
          onSuccess={handleUpdateSuccess}
        />
      )}
      {selectedOrchidSlug && (
        <DeleteOrchidModal
          isOpen={deleteOrchidModal}
          orchidSlug={selectedOrchidSlug}
          onClose={() => {
            setSelectedOrchidSlug('')
            setDeleteOrchidModal(false)
          }}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </>
  )
}
