import puppeteer from 'puppeteer'

describe('Тест. Взаимодействия с подсказками', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false })
    page = await browser.newPage()
    await page.goto('http://localhost:8080')
  })

  afterAll(async () => {
    await browser.close()
  })

  test('Подсказка должна появляться при нажатии кнопки', async () => {
    await page.waitForSelector('.btn')
    await page.waitForSelector('.popover')

    const isTooltipActiveBeforeClick = await page.$eval('.popover', (el) =>
      el.classList.contains('active'),
    )
    expect(isTooltipActiveBeforeClick).toBe(false)

    await page.click('.btn')

    const isTooltipActiveAfterClick = await page.$eval('.popover', (el) =>
      el.classList.contains('active'),
    )
    expect(isTooltipActiveAfterClick).toBe(true)

    const tooltipPosition = await page.$eval('.popover', (el) => {
      const rect = el.getBoundingClientRect()
      return {
        height: rect.height,
        transform: el.style.transform,
      }
    })

    const expectedTransform = `translateY(-${tooltipPosition.height + 7}px)`
    expect(tooltipPosition.transform).toBe(expectedTransform)
  })

  test('При повторном нажатии на кнопку, подсказка должна исчезнуть', async () => {
    await page.click('.btn')

    const isTooltipActiveAfterSecondClick = await page.$eval('.popover', (el) =>
      el.classList.contains('active'),
    )
    expect(isTooltipActiveAfterSecondClick).toBe(false)
  })
})
