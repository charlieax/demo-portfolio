import { Time } from '@core/time'
import { ApiHandler } from 'sst/node/api'

export const handler = ApiHandler(async () => {
  return {
    body: `Hello world. The time is ${Time.now()}`,
  }
})
