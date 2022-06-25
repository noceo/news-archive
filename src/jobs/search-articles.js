import { schedule } from 'node-cron'
import { runScrapers } from '../services/news-service'
import timezones from './timezones'

export default () => {
  const scrapeTimes = [9, 15]
  timezones.forEach((timezone) => {
    const timeslots = scrapeTimes
      .map((timeslot) => (timeslot - timezone.timeDifference) % 24)
      .join()
    schedule(`* * ${timeslots} * * *`, async () => {
      console.log('Scheduled Job!')
      await runScrapers(timezone.scrapers)
      console.log('Done')
    })
  })
}
