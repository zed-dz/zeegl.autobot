const shell = require('shelljs')
// const getBrowser = require('./browser').configBrowser
const getPage = require('./page').configPage

const BASE_URL = 'https://zee.gl/HS3FDesm'

// const ALLOW_SELECTOR = 'html body.banner-page div#overlay div#text span#btn'
// const ALLOW_XPATH = '//*[@id="btn"]'
const GET_LINK = 'body > div.container > div > div > div > div:nth-child(5) > a'

/* THE SCENARIO
* If you don't click anything it will redirect to an ad page
* if you click allow then it will open a new browser windows => choice of allow / block pop-up
* if you pick any of them the ads will stop showing
then you can click get link
*/

const shorten = {
  getLink: async () => {
    try {
      /* initialize the page */
      // const browser = await getBrowser(BASE_URL)
      const page = await getPage(BASE_URL)

      /* Click get link to proceed */

      await page.waitForSelector(GET_LINK)
      // await page.$eval(GET_LINK, elem => elem.click())

      // document.queryselector === $ || document.queryselectorall === $$
      const btnNext = await page.$('body > div.container > div > div > div > div:nth-child(5) > a')
      await btnNext.click()

      /* disable JS when the url changes */
      if (await page.url() !== BASE_URL) {
        // waitFor => combines both waitforselector / waitforxpath / time
        await page.waitFor(10000) // 10s
        await page.setJavaScriptEnabled(false)
      }
      await page.close()
      // for windows
      shell.exec('taskkill /F /IM chrome.exe')
      // for mac or linux
      // shell.exec('pkill chrome')  // shell.exec('pkill chromium')

    } catch(err) {
      console.error(err)
    }
  }
}

module.exports = shorten

/* click alow to continue */
// if the pop ups are allowed you can bypass the permission by clicking the allow button

// check if the element exists
// if (await page.waitForSelector(ALLOW_SELECTOR, { visible: true }))
//   await page.$eval(ALLOW_SELECTOR, elem => elem.click())

// await page.waitForXpath(ALLOW_XPATH, {visible: true})
// await page.$x(ALLOW_XPATH)[0].click()

/* second method to check */
// await page.waitForFunction('document.querySelector("body > div.container > div > div > div > div:nth-child(5) > a") && document.querySelector("body > div.container > div > div > div > div:nth-child(5) > a").clientHeight !== 0 && document.querySelector("body > div.container > div > div > div > div:nth-child(5) > a").style.visibility !== "hidden"')
