import { schedule } from 'node-cron'
import { runScrapers } from '@services/news-service'
import timezones from './timezones'

export default () => {
  const scrapeTimes = [9, 15]
  timezones.forEach(async (timezone) => {
    const timeslots = scrapeTimes.join()
    schedule(
      `0 ${timeslots} * * *`,
      async () => {
        console.log('Scheduled Job!')
        await runScrapers(timezone.scrapers)
        console.log('Done')
      },
      { timezone: timezone.name }
    )
  })
}
