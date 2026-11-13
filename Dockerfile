# 使用官方 Playwright 基础镜像，包含 Node.js、浏览器和系统依赖
# 建议固定版本，以便重复构建
FROM mcr.microsoft.com/playwright:v1.54.0-noble
# 设置容器内的工作目录
WORKDIR /app
# 先复制 package.json 和 package-lock.json，以安装依赖
# 利用 Docker 缓存，只有这些文件变化时才重新执行依赖安装
COPY package*.json ./
# 安装项目依赖
RUN npm ci
# 将 Playwright 项目的其余文件复制到容器中
COPY . .
# 容器启动时运行 Playwright 测试
# 可以根据实际需要调整
CMD ["npx", "playwright", "test"]