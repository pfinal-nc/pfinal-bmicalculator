好嘞，我们就按独立开发者的风格，来写一份 **BMI Calculator 独立站需求文档**。目标是：**一个简单、可上线、可变现的英文静态网站**，后期能扩展。

---

# 📄 需求文档：BMI Calculator 网站

## 1. 项目目标

* 搭建一个独立的 **BMI Calculator 网站**，满足用户快速计算 BMI 并了解健康范围。
* 主打 **英文市场**，获取来自 Google 的自然搜索流量。
* 以 **广告（Google AdSense）+ 联盟推广（健康/健身产品）** 为主要收入来源。

---

## 2. 网站定位

* 关键词目标：`BMI Calculator`，`Calculate BMI Online`，`BMI Chart`，`Healthy Weight Calculator`。
* 用户群体：

  * 健身人群
  * 关注健康的普通用户
  * 学生（医学/营养学）
* 主要功能：输入体重和身高，快速计算 BMI，并给出健康分类。

---

## 3. 功能需求

### 3.1 核心功能

1. **BMI 计算器表单**

   * 输入体重（kg/lbs）
   * 输入身高（cm/feet+inches）
   * 计算按钮
   * 输出结果（BMI 值 + 分类，如 Normal, Overweight, Obese）。

2. **单位切换**

   * 公制（kg, cm）
   * 英制（lbs, feet/inches）

3. **结果展示**

   * 数字结果（BMI = 23.1）
   * 健康分类（Normal weight）
   * 对应区间说明（e.g., 18.5–24.9 is normal）。

---

### 3.2 扩展功能（MVP 之后可加）

* **BMI 分类图表**（彩色条形图显示区间）。
* **年龄 & 性别说明**（可选输入，增加解释性内容）。
* **FAQ 区块**（SEO 优化：What is BMI? How is BMI calculated? Limitations of BMI）。

---

## 4. 页面结构

### 首页 `/`

* 标题：**Free Online BMI Calculator**
* Hero 区域：大标题 + 简单说明 + 计算器表单。
* 结果展示区。
* **BMI Categories Section**（表格：Underweight, Normal, Overweight, Obese）。
* **SEO 内容区**（文字介绍 + FAQ）。

### 其他页面（可选，增强 SEO）

* `/bmi-chart` → 静态 BMI 分类图表页面。
* `/about-bmi` → 解释 BMI 背景、历史、局限性。

---

## 5. 技术需求

* **框架**：静态站生成器（Hugo / Next.js / Nuxt.js，任选）。
* **前端**：HTML + Tailwind CSS（快速美化）+ JavaScript（计算逻辑）。
* **部署**：GitHub Pages / Vercel / Netlify。
* **SEO**：

  * Title: “Free BMI Calculator - Online Body Mass Index Tool”
  * Meta description: “Easily calculate your Body Mass Index (BMI) using our free online BMI calculator. Learn your weight category and check healthy BMI ranges.”
  * Open Graph + Schema（FAQ Schema）。

---

## 6. 广告与变现

1. **Google AdSense** → 页面顶部/侧边/底部挂广告。
2. **Affiliate Links** → 健身器材、减肥产品、健康类 App（Amazon Affiliate, ClickBank）。
3. **后期扩展** → 收录其他计算器（BMR, TDEE），形成健康工具站。

---

## 7. MVP 范围

第一版只做：

* 单页面 `/`，包含 BMI 表单 + 结果 + 分类表。
* 支持公制单位输入。
* 有基本 SEO 文案（200–300 字）。
* 响应式布局（手机端友好）。

---

## 8. 后续迭代

* 增加单位切换（lbs / inches）。
* 增加 FAQ + BMI 图表页面。
* 增加更多健康计算器（BMR, Calories Burned）。
* 增加 Blog 文章引流（SEO 长尾词）。
