# 黄金入手成本测算计算器

一个移动端优先的 Vue3 + TypeScript + Tailwind CSS 静态单页面 MVP，用于测算黄金首饰、投资金条、婚嫁囤金场景下的入手成本与简易盈亏。

## 已实现范围

仅实现 3 个核心 MVP 功能：

1. 黄金成本计算器
   - 输入基础金价、克重、手工费、溢价
   - 实时计算原料价、手工费合计、溢价合计、总花费、综合单克成本

2. 简易盈亏测算模块
   - 输入预期卖出金价
   - 自动计算预期卖出收入、毛利、净收益、净收益率

3. 本地测算记录 + 分享卡片
   - localStorage 最多保存最近 10 条记录
   - Canvas 生成 PNG 分享卡片
   - 页面卡片可直接截图分享

## 强制预埋变现模块

页面结构内已预埋：

- `ad-top`：顶部横幅广告插槽，适配 Google AdSense
- `ad-goods`：结果区块下方商品分销卡片区域
- `ad-footer`：底部固定广告栏
- `ad-modal`：观看广告解锁简易金价对比参考弹窗占位

## 计算公式

当前 MVP 默认手工费与溢价均按“元/克”输入。

```text
原料价 = 基础金价 × 克重
手工费合计 = 手工费 × 克重
溢价合计 = 溢价 × 克重
总花费 = 原料价 + 手工费合计 + 溢价合计
综合单克成本 = 总花费 ÷ 克重

预期卖出收入 = 预期卖出金价 × 克重
毛利 = 预期卖出收入 - 原料价
净收益 = 预期卖出收入 - 总花费
净收益率 = 净收益 ÷ 总花费
```

后续若要调整公式，只需修改：

```text
src/utils/calcGold.ts
```

## 本地启动

要求 Node.js 18+。

```bash
npm install
npm run dev
```

默认访问：

```text
http://localhost:5173
```

## 打包

```bash
npm run build
```

产物目录：

```text
dist/
```

## 本地预览打包产物

```bash
npm run preview
```

## 静态部署

### 部署到 Nginx / 宝塔 / 云服务器

1. 执行打包：

```bash
npm run build
```

2. 将 `dist/` 目录内所有文件上传到站点根目录。
3. Nginx 单页应用建议配置：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 部署到 Vercel

1. 新建 Vercel 项目并导入仓库
2. Framework 选择 `Vite`
3. Build Command：`npm run build`
4. Output Directory：`dist`

### 部署到 Netlify

1. 新建站点并导入仓库
2. Build command：`npm run build`
3. Publish directory：`dist`

## AdSense 接入提示

广告位组件在：

```text
src/components/AdSlot.vue
```

将占位注释中的 `ca-pub-xxxxxxxxxxxxxxxx` 和 `data-ad-slot` 替换为真实 AdSense 配置，并在 `index.html` 中按 AdSense 要求加入官方脚本即可。
