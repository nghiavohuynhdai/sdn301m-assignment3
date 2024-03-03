import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrchidDetails } from '@data/orchid/orchid-api'
import { OrchidDetailsDto } from '@data/orchid/orchid.dto'
import OrchidCommentList from '@view/components/orchid-comment-list'
import OrchidCommentInput from './component/orchid-comment-input'
import { AppContext } from '@view/context/app-context'
import { createComment } from '@data/orchid/comment/comment-api'
import { toast } from 'react-toastify'

export default function OrchidDetails() {
  const { isLogin, user } = useContext(AppContext)
  const [orchid, setOrchid] = useState<OrchidDetailsDto | null>(null)
  const { slug } = useParams()

  const getData = useCallback(async () => {
    if (slug) {
      const orchidDetails = await getOrchidDetails(slug)
      setOrchid(orchidDetails)
    }
  }, [slug])

  useEffect(() => {
    getData()
    return () => {}
  }, [getData])

  const postComment = async (rating: number, comment: string) => {
    const postCommentResult = await createComment(orchid!.slug, rating, comment)
    if (typeof postCommentResult === 'string') {
      toast.error(postCommentResult)
    } else {
      await getData()
      toast.success('Comment posted')
    }
  }

  return orchid ? (
    <>
      <div className='section'>
        <div className='columns'>
          <div className='column is-half'>
            <figure className='image is-4by3'>
              <img src={orchid.image} alt={orchid.name} />
            </figure>
          </div>
          <div className='column is-half'>
            <h1 className='title is-2'>{orchid.name}</h1>
            <h2 className='subtitle is-4'>{orchid.category?.name}</h2>
            <p>
              <strong>Origin:</strong> {orchid.origin}
            </p>
            <p>
              <strong>Nature:</strong> {orchid.isNature ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
      <div className='section'>
        <h2 className='subtitle is-4'>Comment</h2>
        {orchid.comments.length !== 0 && <OrchidCommentList comments={orchid.comments} />}
        {isLogin &&
          !user!.isAdmin &&
          orchid.comments.findIndex((comment) => comment.author._id === user!._id) === -1 && (
            <OrchidCommentInput postComment={postComment} />
          )}
      </div>
    </>
  ) : null
}
