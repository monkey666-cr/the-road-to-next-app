# Prisma Connect Local Database

Prisma 连接本地 PostgreSQL 数据库进行测试，这个需求很常见。我来为你详细介绍一下操作步骤和注意事项。

首先，我用一个表格来汇总连接本地 PostgreSQL 进行测试的主要步骤和要点，方便你快速了解：

| 步骤                  | 操作内容                             | 关键命令/配置                                                                                                                                    | 说明                                                 |
| :-------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| **1. 数据库准备**     | 使用 Docker 创建本地 PostgreSQL 容器 | `docker run -itd -e POSTGRES_USER=用户名 -e POSTGRES_PASSWORD=密码 -p 5432:5432 -v 本地路径:/var/lib/postgresql/data --name postgresql postgres` | 确保 Docker 已安装并运行；映射端口和卷以便数据持久化 |
| **2. 项目初始化**     | 安装 Prisma 相关依赖                 | `npm install prisma --save-dev``npm install @prisma/client`                                                                                      | 初始化 Prisma：`npx prisma init`                     |
| **3. 连接配置**       | 配置 `DATABASE_URL`                  | `postgresql://用户名:密码@localhost:5432/数据库名?schema=public`                                                                                 | 修改 `.env` 和 `schema.prisma` 文件                  |
| **4. 定义模型**       | 在 `schema.prisma` 中定义数据模型    | `model User { ... }`                                                                                                                             | 或使用 `prisma db pull` 从现有数据库提取模型         |
| **5. 迁移数据库**     | 应用模型变更到数据库                 | `npx prisma migrate dev --name init`                                                                                                             | 会创建迁移文件、应用迁移并生成 Prisma Client         |
| **6. 测试数据库清理** | 编写清理逻辑以确保测试隔离           | `await prisma.modelName.deleteMany()`                                                                                                            | 通常在 `beforeEach` 或 `afterEach` 钩子中执行        |

### 🔧 详细步骤说明

下面是一些关键步骤的更多细节：

1.  **准备本地 PostgreSQL 数据库**：使用 Docker 是快速搭建测试数据库的常用方式。命令示例参考了表格中的内容。运行后，你可以使用 `docker ps` 检查容器是否正常运行，并通过 `docker exec -it postgresql psql -U 你的用户名 -d postgres` 进入容器的 psql 命令行进行交互。

2.  **配置 Prisma 连接**：
    *   在项目根目录下的 `.env` 文件中，正确设置 `DATABASE_URL` 环境变量至关重要，其格式如表格所示。
    *   确保 `prisma/schema.prisma` 文件中的 `datasource` 块正确引用了环境变量：
        ```prisma
        datasource db {
          provider = "postgresql"
          url      = env("DATABASE_URL")
        }
        ```

3.  **定义数据模型（Schema）**：你可以手动在 `schema.prisma` 文件中编写数据模型（如 `model User {...}`）。如果你的测试数据库已存在表，更快捷的方法是使用 `npx prisma db pull` 命令，Prisma 会自动根据数据库结构生成对应的模型定义。

4.  **运行数据库迁移**：执行 `npx prisma migrate dev --name init` 命令。这个命令不仅会根据你的 Schema 变化生成迁移文件，并将这些变更应用到你的本地 PostgreSQL 数据库，同时还会生成 Prisma Client 供你后续在代码中调用。

5.  **生成 Prisma Client**：每当你的 Prisma Schema 发生变更时，都需要运行 `npx prisma generate` 来重新生成基于最新模型定义的、类型安全的 Prisma Client。这样你就能在代码中享受到类型提示和校验的好处。

### ⚙️ 编写测试与数据库清理

在进行测试时，保持测试之间的数据独立性非常重要，避免测试相互干扰。

*   **使用 Jest 或 Mocha 等测试框架**时，一个常见的做法是在每个测试开始前或结束后清理数据库。你可以使用 Prisma Client 的 `deleteMany` 方法。
*   **示例代码（使用 Jest）**：
    ```javascript
    import { PrismaClient } from '@prisma/client';
    const prisma = new PrismaClient();

    // 假设你有一个函数来获取所有定义模型的名字
    // 注意：这只是一个示例，你需要根据实际情况调整获取模型名称的逻辑
    // Prisma Client 实例的属性并不直接是所有模型名称，请谨慎操作
    const getModelNames = () => {
      // 这种方法并不可靠，仅作示意
      // 实际项目中，你可能需要手动列出需要清理的模型，或使用其他方法
      return ['user', 'post']; // 示例模型名称
    };

    beforeEach(async () => {
      // 在每次测试之前清理相关表
      const modelNames = getModelNames();
      for (const modelName of modelNames) {
        // 注意：这种动态访问的方式需要确保 modelName 正确且存在
        await prisma[modelName].deleteMany();
      }
    });

    afterAll(async () => {
      // 所有测试结束后断开 Prisma 连接
      await prisma.$disconnect();
    });

    test('测试用例', async () => {
      // 你的测试逻辑
      const newUser = await prisma.user.create({
        data: { name: 'Test User', email: 'test@example.com' },
      });
      expect(newUser).toBeDefined();
    });
    ```
    **重要提醒**：上面的 `getModelNames` 函数和动态访问 `prisma[modelName]` 的方式仅为示例。Prisma Client 并不会直接将其所有数据模型作为属性名暴露。在实际项目中，更可靠的做法是：
        *   **手动指定**需要清理的模型列表。
        *   或者考虑使用一些社区提供的工具库（但在你给出的搜索结果中未详细提及）。

    更简单的做法是针对每个测试文件明确知道要操作哪些表，直接对这些表执行 `deleteMany`：
    ```javascript
    beforeEach(async () => {
      await prisma.user.deleteMany();
      await prisma.post.deleteMany();
      // ... 清理其他需要的表
    });
    ```

### ⚠️ 注意事项

1.  **环境隔离**：强烈建议**为测试使用独立的数据库**（例如 `myapp-test`），并与开发（development）数据库区分开。你可以在测试环境的 `.env.test` 文件中指定专门的 `DATABASE_URL`，并在运行测试脚本时使用该环境变量。
2.  **连接池管理**：在测试脚本的 `afterAll` 钩子中调用 `prisma.$disconnect()` 是一个好习惯，以确保在所有测试完成后正确关闭数据库连接，避免资源泄漏。
3.  **避免操作生产数据库**：**再三检查你的 `DATABASE_URL`**，特别是在测试脚本中，确保它指向的是你的测试数据库（通常是本地数据库），而不是任何生产环境或重要的数据库，以免造成数据丢失。
4.  **Prisma Studio**：你还可以使用 `npx prisma studio` 命令启动一个本地可视化工具（通常运行在 http://localhost:5555），方便你查看和操作数据库中的数据，这在调试测试用例时很有帮助。

### 💎 总结

按照上述步骤，你应该能够成功配置 Prisma 以连接本地 PostgreSQL 数据库进行测试。关键在于：
*   **使用 Docker 快速启动隔离的 PostgreSQL 实例**。
*   **正确配置 `DATABASE_URL` 环境变量**指向测试数据库。
*   **在测试生命周期钩子中清理数据库数据**，保证测试的独立性。
*   **始终与生产环境数据库保持隔离**，确保安全。

希望这些信息能帮助你顺利设置测试环境！如果你在具体操作过程中遇到其他问题，欢迎再来问我。