# BMI Calculator - Free Online Body Mass Index Tool

一个基于 Nuxt 4 + Nuxt UI 3.3 构建的现代化 BMI 计算器静态网站。

## 🚀 特性

- **免费使用**: 完全免费的 BMI 计算工具
- **双单位支持**: 支持公制 (kg, cm) 和英制 (lbs, ft) 单位
- **即时计算**: 实时计算 BMI 并显示分类结果
- **响应式设计**: 完美适配桌面、平板和移动设备
- **SEO 优化**: 针对搜索引擎优化的静态站点
- **现代化 UI**: 基于 Nuxt UI 3.3 的美观界面
- **性能优化**: 静态生成，快速加载

## 🛠️ 技术栈

- **框架**: Nuxt 4
- **UI 库**: Nuxt UI 3.3
- **样式**: Tailwind CSS
- **部署**: GitHub Pages / Vercel / Netlify
- **类型**: TypeScript

## 📦 安装和运行

### 环境要求

- Node.js 18+ 
- npm 或 yarn

### 本地开发

```bash
# 克隆项目
git clone <your-repo-url>
cd bmi-calculator

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建和部署

```bash
# 构建静态站点
npm run generate

# 预览构建结果
npm run preview

# 部署到 GitHub Pages
npm run build
```

## 📁 项目结构

```
bmi-calculator/
├── components/          # 可复用组件
│   ├── BMICalculator.vue
│   ├── BMIResult.vue
│   └── BMICategories.vue
├── layouts/            # 页面布局
│   └── default.vue
├── pages/              # 页面文件
│   └── index.vue
├── assets/             # 静态资源
│   └── css/
├── data/               # 静态数据
│   └── bmi-categories.json
├── plugins/            # Nuxt 插件
│   ├── bmi-calculator.client.ts
│   └── seo.client.ts
├── public/             # 公共静态资源
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── .github/workflows/  # GitHub Actions
│   └── deploy.yml
├── nuxt.config.ts      # Nuxt 配置
├── package.json        # 项目依赖
└── README.md          # 项目说明
```

## 🎯 功能说明

### 核心功能

1. **BMI 计算器**
   - 支持公制和英制单位输入
   - 实时计算 BMI 值
   - 显示健康分类和建议

2. **结果展示**
   - 清晰的 BMI 数值显示
   - 颜色编码的健康分类
   - 个性化的健康建议

3. **BMI 分类表**
   - WHO 标准的 BMI 分类
   - 直观的颜色标识
   - 详细的健康范围说明

### SEO 优化

- 结构化数据 (Schema.org)
- 优化的 meta 标签
- 自动生成的 sitemap
- 搜索引擎友好的 URL

## 🚀 部署选项

### GitHub Pages

1. 启用 GitHub Pages
2. 设置 Actions 权限
3. 推送代码到 main 分支
4. 自动部署到 `https://username.github.io/repository-name`

### Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### Netlify

1. 连接 GitHub 仓库
2. 设置构建命令: `npm run generate`
3. 设置发布目录: `dist`
4. 自动部署

## 📈 变现策略

### 广告收入
- Google AdSense 集成
- 页面顶部/侧边/底部广告位
- 移动端友好的广告布局

### 联盟推广
- 健康/健身产品推广
- Amazon Affiliate 链接
- 健康类 App 推荐

### 扩展功能
- 更多健康计算器 (BMR, TDEE)
- 健康文章博客
- 用户账户和历史记录

## 🔧 自定义配置

### 修改域名
在 `nuxt.config.ts` 中更新：
```typescript
app: {
  head: {
    meta: [
      { property: 'og:url', content: 'https://your-domain.com' }
    ]
  }
}
```

### 添加新页面
1. 在 `pages/` 目录创建新的 `.vue` 文件
2. 更新 `sitemap.xml`
3. 在导航栏添加链接

### 自定义样式
在 `assets/css/main.css` 中添加自定义样式。

## 📝 开发说明

### 添加新功能
1. 在 `components/` 目录创建组件
2. 在 `plugins/` 目录添加工具函数
3. 更新 `data/` 目录的数据文件

### 性能优化
- 使用 `nuxt generate` 进行静态生成
- 启用 payload 提取
- 优化图片和资源加载

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

如有问题，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件至 [your-email@example.com]

---

**注意**: 此 BMI 计算器仅用于教育目的，不能替代专业医疗建议。如有健康问题，请咨询专业医生。
