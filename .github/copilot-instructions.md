---
description: 'Playwright 测试生成说明'
applyTo: '**'
---

## 测试编写指南

### 代码质量标准
- **定位器（Locators）**：优先使用面向用户、基于角色的定位器（`getByRole`、`getByLabel`、`getByText` 等），以提高测试的稳定性和可访问性。使用 `test.step()` 对交互进行分组，提升测试的可读性和报告质量。
- **断言（Assertions）**：使用支持自动重试的 Web 优先断言。这些断言以 `await` 关键字开头（例如 `await expect(locator).toHaveText()`）。除非专门测试可见性变化，否则避免使用 `expect(locator).toBeVisible()`。
- **超时（Timeouts）**：依赖 Playwright 内置的自动等待机制。避免硬编码等待时间或延长默认超时时间。
- **清晰度（Clarity）**：使用描述清晰、能明确表达意图的测试和步骤标题。仅在解释复杂逻辑或不明显的交互时添加注释。

### 测试结构
- **导入**：以 `import { test, expect } from '@playwright/test';` 开头。
- **组织**：将某项功能的相关测试归入一个 `test.describe()` 代码块。
- **钩子**：使用 `beforeEach` 执行 `describe` 代码块中所有测试共有的准备工作（例如导航到某个页面）。
- **标题**：遵循清晰的命名约定，例如 `功能 - 具体操作或场景`。

### 文件组织
- **位置**：将所有测试文件存放在 `tests/` 目录中。
- **命名**：采用 `<feature-or-page>.spec.ts` 命名约定（例如 `login.spec.ts`、`search.spec.ts`）。
- **范围**：尽量为应用的每项主要功能或每个主要页面分别设置一个测试文件。

### 断言最佳实践
- **UI 结构**：使用 `toMatchAriaSnapshot` 验证组件的可访问性树结构。这种方式可提供全面且可访问的快照。
- **元素数量**：使用 `toHaveCount` 断言定位器找到的元素数量。
- **文本内容**：使用 `toHaveText` 进行精确文本匹配，使用 `toContainText` 进行部分文本匹配。
- **导航**：使用 `toHaveURL` 验证操作后的页面 URL。

## 测试结构示例

```typescript
import { test, expect } from '@playwright/test';

test.describe('电影搜索功能', () => {
  test.beforeEach(async ({ page }) => {
    // 每项测试开始前，导航到应用程序
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
  });

  test('按片名搜索电影', async ({ page }) => {
    await test.step('激活并执行搜索', async () => {
      await page.getByRole('search').click();
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      await searchInput.fill('Garfield');
      await searchInput.press('Enter');
    });

    await test.step('验证搜索结果', async () => {
      // 验证搜索结果的可访问性树
      await expect(page.getByRole('main')).toMatchAriaSnapshot(`
        - main:
          - heading "Garfield" [level=1]
          - heading "search results" [level=2]
          - list "movies":
            - listitem "movie":
              - link "poster of The Garfield Movie The Garfield Movie rating":
                - /url: /playwright-movies-app/movie?id=tt5779228&page=1
                - img "poster of The Garfield Movie"
                - heading "The Garfield Movie" [level=2]
      `);
    });
  });
});
```

## 测试执行策略

1. **首次运行**：使用 `npx playwright test --project=chromium` 执行测试
2. **调试失败**：分析测试失败情况并找出根本原因
3. **迭代**：根据需要优化定位器、断言或测试逻辑
4. **验证**：确保测试能够稳定通过，并覆盖预期功能
5. **报告**：反馈测试结果以及发现的所有问题

## 质量检查清单

在完成测试之前，请确保：
- [ ] 所有定位器均具备可访问性和明确性，并能避免违反严格模式
- [ ] 测试分组符合逻辑，并遵循清晰的结构
- [ ] 断言具有实际意义，并反映用户预期
- [ ] 测试遵循一致的命名约定
- [ ] 代码格式规范，注释恰当
