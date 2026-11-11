// import { test, expect } from '@playwright/test';
// import { solveCaptcha } from '../utils/captchaHelper';

// test('should login with OCR captcha', async ({ page }) => {
//   const username = 'administrator';
//   const password = 'Gsta!QAZ2wsx';

//   await page.goto('http://8.138.150.147:8087/#/login?redirect=%2Fhome');

//   const usernameInput = page.getByPlaceholder('用户名').or(page.locator('input[placeholder="用户名"]'));
//   const passwordInput = page.getByPlaceholder('密码').or(page.locator('input[placeholder="密码"]'));
//   const captchaInput = page.getByPlaceholder('验证码').or(page.locator('input[placeholder="验证码"]'));
//   const loginButton = page.getByRole('button', { name: /登\s*录/i }).or(page.locator('button:has-text("登录")'));
//   const captchaImg = page.locator('img').first();

//   await expect(usernameInput).toBeVisible();
//   await expect(passwordInput).toBeVisible();
//   await expect(captchaImg).toBeVisible();

//   await usernameInput.fill(username);
//   await passwordInput.fill(password);

//   const captchaText = await solveCaptcha(captchaImg);
//   console.log('OCR 识别结果:', captchaText);

//   await captchaInput.fill(captchaText);
//   await loginButton.click();

//   await expect(page).toHaveURL(/\/home(?:$|[?#])/i);
//   await expect(page.getByRole('heading', { name: /首页|Home|Dashboard/i })).toBeVisible();
// });