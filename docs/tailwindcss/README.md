# tailwindcss属性解读

## demo.html

### 布局属性 (Layout)
- `flex`: 将元素设置为弹性容器
- `flex-col`: 设置弹性方向为垂直方向
- `flex-1`: 元素会伸缩并填充可用空间
- `justify-between`: 弹性项目均匀分布，第一项在起始处，最后一项在末尾处
- `items-center`: 弹性项目在交叉轴上居中对齐

### 尺寸属性 (Sizing)
- `w-full`: 设置宽度为100%
- `max-w-[420px]`: 设置最大宽度为420px（自定义值）
- `max-w-[300px]`: 设置最大宽度为300px（自定义值）

### 间距属性 (Spacing)
- `p-4`, `p-2`: 设置内边距为1rem(16px)或0.5rem(8px)
- `my-2`, `mb-2`: 设置垂直方向或底部的外边距
- `gap-y-8`: 设置垂直方向的间隙为2rem(32px)

### 边框和圆角属性 (Border & Radius)
- `border`: 添加1px宽度的边框
- `rounded`: 添加4px的圆角

### 文字属性 (Typography)
- `text-3xl`, `text-lg`, `text-sm`: 设置文字大小
- `font-bold`, `font-semibold`: 设置字体粗细
- `truncate`: 文本溢出时显示省略号
- `tracking-tight`: 减少字母间距
- `underline`: 添加下划线
