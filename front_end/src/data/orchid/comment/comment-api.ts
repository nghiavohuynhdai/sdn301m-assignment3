import ResponseDto from '@data/response.dto'

const getApiRoute = (orchidSlug: string) => `${import.meta.env.VITE_API_URL}/orchids/${orchidSlug}/comments`

const createComment = async (orchidSlug: string, rating: number, comment: string) => {
  try {
    const response = await fetch(getApiRoute(orchidSlug), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rating, comment })
    })

    if (response.status !== 201) {
      const responseDto: ResponseDto<unknown> = await response.json()
      return responseDto.message
    }
    return true
  } catch (error) {
    console.log(error)
    return 'Server error'
  }
}

export { createComment }
