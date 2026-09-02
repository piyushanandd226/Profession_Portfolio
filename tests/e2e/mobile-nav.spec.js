import { test, expect } from '@playwright/test'

test('profile picture is included in the production build and loads successfully', async ({ page }) => {
  await page.goto('/')

  const profilePhoto = page.getByAltText('Piyush Kumar Anand')
  await expect(profilePhoto).toBeVisible()
  await expect(profilePhoto).toHaveJSProperty('complete', true)
  await expect(profilePhoto).not.toHaveJSProperty('naturalWidth', 0)
})

test('mobile hamburger opens/closes nav and supports back-to-top', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'This test validates mobile navigation behavior only.')

  await page.goto('/')

  const hamburger = page.locator('button.hamburger')
  const navLinks = page.locator('#nav-links')

  await expect(hamburger).toBeVisible()
  await expect(navLinks).not.toHaveClass(/show/)

  await hamburger.click()
  await expect(hamburger).toHaveAttribute('aria-expanded', 'true')
  await expect(navLinks).toHaveClass(/show/)

  await page.locator('#nav-links a[href="#projects"]').click()
  await expect(hamburger).toHaveAttribute('aria-expanded', 'false')

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  const backToTop = page.locator('.back-to-top')
  await expect(backToTop).toBeVisible()
  await backToTop.click()

  await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeLessThan(60)
})
