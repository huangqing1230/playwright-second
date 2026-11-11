import sharp from 'sharp';
import { createWorker } from 'tesseract.js';
import { Locator } from '@playwright/test';

export async function solveCaptcha(captchaImage: Locator): Promise<string> {
  // 1. 截取验证码图片 Buffer
  const imageBuffer = await captchaImage.screenshot();

  // 2. 图像预处理（关键步骤，直接决定识别率）
  // 放大3倍 + 中值滤波去噪 + 灰度化 + 二值化
  const processedBuffer = await sharp(imageBuffer)
    .resize({ width: 600, kernel: 'lanczos3' }) // 放大，Tesseract 对小图识别差
    .median(3) // 中值滤波，去除干扰线
    .greyscale() // 灰度化
    .normalize() // 拉伸对比度
    .threshold(150) // 二值化
    .toBuffer();

  // 3. 初始化 Tesseract Worker，限制识别字符集
  const worker = await createWorker('eng', 1, {
    // 如果你识别的是纯数字，可以在这里限制字符白名单
    // logger: m => console.log(m), // 取消注释可查看识别进度
  });
  
  await worker.setParameters({
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', // 按需修改
    tessedit_pageseg_mode: '7', // 单行文本模式
  });

  // 4. OCR 识别
  const { data: { text } } = await worker.recognize(processedBuffer);
  await worker.terminate();

  // 5. 清洗识别结果（去除空格、换行等）
  return text.replace(/[^a-zA-Z0-9]/g, '').trim();
}