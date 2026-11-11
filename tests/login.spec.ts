// import { test, expect } from '@playwright/test';

// test('should login with valid credentials', async ({ page }) => {
//   const username = process.env.MDAS_USERNAME ?? 'admin';
//   const password = process.env.MDAS_PASSWORD ?? 'admin123';
//   const captcha = process.env.MDAS_CAPTCHA ?? '';

//   await page.goto('http://8.138.150.147:8087/#/login?redirect=%2Fhome');

//   await expect(page).toHaveURL(/\/login.*redirect=%2Fhome/i);

//   await page.getByPlaceholder('用户名').fill(username);
//   await page.getByPlaceholder('密码').fill(password);

//   const captchaInput = page.getByPlaceholder('验证码');
//   if (await captchaInput.count()) {
//     await captchaInput.fill(captcha);
//   }

//   await page.getByRole('button', { name: /登\s*录/i }).click();

//   await expect(page).toHaveURL(/\/home(?:$|[?#])/i);
//   await expect(page.getByRole('heading', { name: /首页|Home|Dashboard/i })).toBeVisible();
// });
