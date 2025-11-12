import { quizes } from './quizes/quizes'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(quizes)
  // All services will be registered here
}
