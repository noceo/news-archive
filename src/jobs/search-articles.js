import { schedule } from 'node-cron'
import { runScrapers } from '@services/news-service'
import timezones from './timezones'

const scrapeTimes = [9, 15].join()

export default () => {
  timezones.forEach(async (timezone) => {
    schedule(
      `0 ${scrapeTimes} * * *`,
      async () => {
        console.log('Scheduled Job for timezone: ', timezone.name)
        await runScrapers(timezone.scrapers)
        console.log('Done')
      },
      { timezone: timezone.name }
    )
  })
}
