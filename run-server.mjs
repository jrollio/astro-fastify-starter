import { handler as ssrHandler } from './dist/server/entry.mjs'
import { createServer } from './dist/server/api.mjs'
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from 'node:url'
import cors from '@fastify/cors'

(async () => {
  const fastify = await createServer()

  await fastify.register(cors, {
    origin: [
      'http://localhost:8080',
      'http://127.0.0.1:8080',
    ],
  })

  await fastify.register(fastifyStatic, {
    root: fileURLToPath(new URL('./dist/client', import.meta.url)),
  })

  fastify.use(ssrHandler)

  try {
    await fastify.listen({ port: 8080 })
  } catch (err) {
    fastify.logger.error(err)
    process.exit(1)
  }
})()

