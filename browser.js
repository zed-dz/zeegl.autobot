const puppeteer = require('puppeteer')

const config = {
  configBrowser: async () => {

    // The method launch launches a browser instance with given arguments. The browser will be closed when the parent node.js process is closed.

    // Adding --disable-notifications to Pupeeteer launch() args works for me in relation to current issue. According to this link this argument Disables the Web Notification and the Push APIs. but it's ok for my purposes

    /* Initialize browser*/
    const brw = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--disable-notifications']
      // devtools: false
      // slowMo: 250 // slow down by 250ms
      // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
      // userDataDir: "C:/Users/[USER]/PATH/TO/MY/DIRECTORY/myUserDataDir"
    })

    return brw
  }
}
module.exports = config
