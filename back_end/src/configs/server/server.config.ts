const host = process.env.HOST || 'localhost'
const port = Number.parseInt(process.env.PORT ?? '5000')

export { host, port }
