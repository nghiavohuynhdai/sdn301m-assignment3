interface Route {
  path: string
  isPublic: boolean
}

const routes: { [key: string]: Route } = {
  home: {
    path: '',
    isPublic: true
  },
  orchidDetails: {
    path: 'orchids/:slug',
    isPublic: true
  }
}

export default routes
