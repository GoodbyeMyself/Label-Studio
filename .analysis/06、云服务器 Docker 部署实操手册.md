# Label Studio 云服务器 Docker 部署实操手册

## 1. 文档目标

本文档面向当前仓库的实际部署落地，目标是把本地的 Label Studio 工程部署到一台已经安装好 Docker 的云服务器上，并能稳定访问。

本文基于以下前提：

- 当前仓库路径：`D:\Git\Label-Studio`
- 服务器已安装 Docker 和 Docker Compose
- 已在本地准备好两个部署文件：
  - `docker-compose.server.yml`
  - `.env.prod`
- 当前目标服务器为：
  - IP：`111.229.195.106`
  - 用户：`root`

说明：

- 本文不再使用仓库默认的 `docker-compose.yml` 直接上公网。
- 原因是默认配置更偏开发/测试，其中 PostgreSQL 认证方式不适合公网服务器直接使用。
- 生产部署改为使用单独的 `docker-compose.server.yml`。

---

## 2. 当前部署方案概览

本次部署采用的是“源码上传服务器后，在服务器本机执行构建和启动”的方式。

整体结构如下：

- `nginx`
  - 对外暴露 `8080`
  - 负责代理静态资源和转发请求
- `app`
  - 运行 Label Studio 主应用
  - 使用仓库内置 entrypoint 和 `label-studio-uwsgi`
- `db`
  - 使用 PostgreSQL 容器
  - 通过 named volume 做持久化

持久化策略如下：

- `ls_data`
  - 持久化 Label Studio 数据目录 `/label-studio/data`
- `pg_data`
  - 持久化 PostgreSQL 数据目录 `/var/lib/postgresql/data`

这个方案的优点：

- 贴合当前仓库已有 Dockerfile 和启动脚本
- 不需要额外改造应用启动链路
- 自动等待数据库、自动迁移
- 使用 named volume，减少宿主机目录权限问题

---

## 3. 本地需要准备的文件

在上传到服务器前，确保本地仓库内至少有下面两个文件：

### 3.1 `docker-compose.server.yml`

该文件用于替代默认的 `docker-compose.yml` 做服务器部署。

职责：

- 定义 `nginx`、`app`、`db` 三个服务
- 把外部端口映射到 `8080`
- 把 `.env.prod` 中的变量注入容器
- 创建持久化卷

### 3.2 `.env.prod`

该文件用于保存生产环境变量。

当前至少包含：

```env
LABEL_STUDIO_HOST=http://111.229.195.106:8080
LABEL_STUDIO_ALLOWED_HOSTS=111.229.195.106,127.0.0.1,localhost
LABEL_STUDIO_CSRF_TRUSTED_ORIGINS=http://111.229.195.106:8080

POSTGRE_NAME=labelstudio
POSTGRE_USER=labelstudio
POSTGRE_PASSWORD=请替换为你的数据库密码

SECRET_KEY=请替换为随机生成的长字符串

DEBUG=0
JSON_LOG=1
LOG_LEVEL=INFO
CORS_ALLOW_ALL_ORIGINS=false

DISABLE_SIGNUP_WITHOUT_LINK=false
SESSION_COOKIE_SECURE=0
CSRF_COOKIE_SECURE=0
```

说明：

- `POSTGRE_PASSWORD` 不要写成默认值。
- `SECRET_KEY` 必须自己生成，不要复用示例值。
- 当前是通过 IP + HTTP 访问，所以 `SESSION_COOKIE_SECURE` 和 `CSRF_COOKIE_SECURE` 先设为 `0`。
- 如果后续切到 HTTPS，应把这两个值改成 `1`。

---

## 4. 为什么不用仓库默认 Compose 直接部署

仓库根目录的默认 `docker-compose.yml` 更适合本地或测试环境，不能不加处理就直接上公网服务器。

主要原因有两点：

### 4.1 PostgreSQL 认证方式不适合公网默认使用

默认 compose 中数据库服务包含：

```yaml
POSTGRES_HOST_AUTH_METHOD=trust
```

这意味着数据库认证策略偏开发友好，不适合作为公网机器上的正式部署默认值。

### 4.2 `POSTGRE_PASSWORD` 默认是空

默认 `app` 服务里数据库密码为空，这同样不适合作为正式部署基线。

因此，服务器部署必须使用单独的：

- `docker-compose.server.yml`
- `.env.prod`

---

## 5. 将本地文件上传到服务器

推荐方式有两种。

### 5.1 方式一：直接上传整个项目目录

在本地 PowerShell 执行：

```powershell
scp -r "D:\Git\Label-Studio" root@111.229.195.106:/opt/
```

上传完成后，服务器上的目录通常是：

```bash
/opt/Label-Studio
```

### 5.2 方式二：先上传项目，再单独覆盖部署文件

如果服务器上已经有项目目录，只需要增量上传：

```powershell
scp "D:\Git\Label-Studio\docker-compose.server.yml" root@111.229.195.106:/opt/Label-Studio/
scp "D:\Git\Label-Studio\.env.prod" root@111.229.195.106:/opt/Label-Studio/
```

说明：

- `.env.prod` 中包含敏感信息，不建议发到公共聊天、工单或代码仓库。
- 如果团队协作，建议只提交 `.env.prod.example`，真实 `.env.prod` 只放服务器。

---

## 6. 登录服务器并确认环境

登录服务器：

```bash
ssh root@111.229.195.106
```

进入项目目录：

```bash
cd /opt/Label-Studio
```

确认 Docker 和 Compose 可用：

```bash
docker --version
docker compose version
```

确认部署文件已经到位：

```bash
ls -la
```

重点检查：

- `docker-compose.server.yml`
- `.env.prod`
- `Dockerfile`
- `deploy/`

---

## 7. 启动前建议先做一次配置校验

不要直接上来就 `up -d --build`，先检查 Compose 配置是否能正确解析。

执行：

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml config
```

如果该命令能正常输出完整配置，说明：

- YAML 语法正确
- `.env.prod` 变量已正确注入
- Compose 文件结构可被 Docker 正常识别

如果这里就报错，应先修复：

- YAML 缩进
- 环境变量写法
- 文件编码或不可见字符

---

## 8. 正式启动服务

在服务器项目目录执行：

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml up -d --build
```

该命令会做四件事：

1. 使用当前仓库的 `Dockerfile` 构建镜像
2. 创建 `nginx`、`app`、`db` 三个容器
3. 自动初始化数据库连接与迁移
4. 后台运行整个服务栈

如果服务器第一次构建，时间可能较长。

影响构建速度的主要因素：

- 服务器 CPU 核数
- 服务器内存
- 网络拉取依赖速度
- 前端构建阶段资源消耗

---

## 9. 启动后检查容器状态

### 9.1 查看服务状态

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml ps
```

正常情况下应看到：

- `nginx` 为 `Up`
- `app` 为 `Up`
- `db` 为 `Up`

### 9.2 查看日志

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml logs -f
```

如果只看某个服务：

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml logs -f app
docker compose --env-file .env.prod -f docker-compose.server.yml logs -f nginx
docker compose --env-file .env.prod -f docker-compose.server.yml logs -f db
```

重点关注：

- `app` 是否成功连上数据库
- 是否执行了 `locked_migrate`
- `nginx` 是否正常启动
- `db` 是否正常完成初始化

---

## 10. 对外访问与安全组配置

当前部署端口为：

- 服务器 `8080`

因此需要在云服务器安全组或防火墙放行：

- `22`
- `8080`

浏览器访问地址：

```text
http://111.229.195.106:8080
```

如果页面打不开，优先排查：

1. 云平台安全组是否放行 `8080`
2. 服务器本机防火墙是否拦截
3. `nginx` 容器是否正常运行
4. `app` 容器是否正常启动

---

## 11. 首次登录与账号初始化

当前 `.env.prod` 里：

```env
DISABLE_SIGNUP_WITHOUT_LINK=false
```

这样做的目的，是为了第一次部署后可以直接在页面注册第一个管理员账号。

首次操作建议如下：

1. 打开 `http://111.229.195.106:8080`
2. 注册第一个账号
3. 登录系统
4. 创建一个测试项目
5. 验证任务导入和页面访问是否正常

---

## 12. 首次部署完成后的安全收口

第一次注册完管理员账号后，建议立刻收紧公开注册能力。

把服务器上的 `.env.prod` 修改为：

```env
DISABLE_SIGNUP_WITHOUT_LINK=true
```

然后重新启动：

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml up -d
```

这样可以避免公网用户继续自行注册。

补充建议：

- 后续把 root 密码改掉
- 尽量切换到 SSH Key 登录
- 不要把 `.env.prod` 提交进公开仓库

---

## 13. 常用运维命令

### 13.1 启动

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml up -d
```

### 13.2 重新构建并启动

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml up -d --build
```

### 13.3 停止服务

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml down
```

### 13.4 查看状态

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml ps
```

### 13.5 查看日志

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml logs -f
```

### 13.6 进入应用容器

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml exec app sh
```

### 13.7 进入数据库容器

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml exec db sh
```

---

## 14. 部署后最小验收清单

上线前至少完成以下检查：

1. 页面可以正常打开
2. 可以成功注册并登录
3. 可以创建项目
4. 可以导入任务
5. 可以进入标注页面
6. 可以保存标注结果
7. 可以导出结果
8. 重启容器后数据未丢失
9. 日志可以正常查看
10. 已关闭开放注册或明确知道何时关闭

---

## 15. 常见问题排查

### 15.1 `yaml` 语法错误

常见报错：

```text
yaml: while parsing a block mapping ... did not find expected key
```

优先检查：

- YAML 缩进是否统一为 2 个空格
- 是否误用了 tab
- 是否有中文冒号 `：`
- `volumes:` 是否被错误缩进到 `services:` 或某个服务内部

建议先执行：

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml config
```

### 15.2 访问不到页面

优先检查：

```bash
docker compose --env-file .env.prod -f docker-compose.server.yml ps
docker compose --env-file .env.prod -f docker-compose.server.yml logs -f nginx
docker compose --env-file .env.prod -f docker-compose.server.yml logs -f app
```

重点看：

- `nginx` 是否启动
- `app` 是否监听成功
- 服务器 `8080` 是否放行

### 15.3 数据库连接失败

优先检查：

- `.env.prod` 中的 `POSTGRE_*` 是否正确
- `db` 容器是否成功启动
- `app` 日志里是否反复等待数据库

### 15.4 构建很慢或构建失败

可能原因：

- 服务器内存不足
- 前端构建资源占用高
- 网络拉取依赖过慢

处理建议：

- 提升服务器配置
- 在本地先构建镜像，再推送到镜像仓库
- 或使用 `docker save` / `docker load` 在本地和服务器之间传镜像

### 15.5 数据丢失

如果重建容器后数据丢失，优先检查：

- 是否使用了 named volume
- 是否误执行了删除 volume 的命令
- 是否换了 compose 项目名导致重新创建卷

---

## 16. 后续建议

如果只是先把平台跑起来，目前方案已经足够。

如果后续要进入正式长期运行阶段，建议继续补齐：

1. 域名接入
2. HTTPS
3. 关闭公网 root 密码登录
4. 备份 PostgreSQL 数据
5. 备份 `/label-studio/data`
6. 日志采集与告警
7. 预发环境验证流程

---

## 17. 结论

对于当前仓库，最稳妥的云服务器部署路径是：

1. 在本地修正 `docker-compose.server.yml` 和 `.env.prod`
2. 上传项目与部署文件到服务器
3. 先用 `docker compose ... config` 做配置校验
4. 再执行 `docker compose ... up -d --build`
5. 完成首次注册后立刻关闭开放注册

这条路径的优点是：

- 改动最小
- 贴合当前仓库现有结构
- 风险低
- 便于后续继续二开和运维
