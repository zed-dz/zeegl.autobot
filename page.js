const PuppeteerBlocker = require('@cliqz/adblocker-puppeteer').PuppeteerBlocker
const fetch = require('cross-fetch')
const getBrowser = require('./browser').configBrowser

const config = {
  configPage: async BASE_URL => {
    try {
      /* initialize the browser */
      const browser = await getBrowser()

      /* block push notification & geolocation permission */
      await browser.defaultBrowserContext().overridePermissions(BASE_URL, ['geolocation', 'notifications'])

      /* initialize the page*/
      const pge = await browser.newPage()
      // wait until network load + go to the page you want
      await pge.setDefaultNavigationTimeout(0) // default 30000 ms // 3s
      await pge.goto(BASE_URL, { waitUntil: 'networkidle2' })

      /* block ads nn the page */
      const blocker = await PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch)
      blocker.enableBlockingInPage(pge)

      return pge

    } catch (err) {
      console.error(err)
    }
  }
}
module.exports = config
