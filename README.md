## 代码目前保存在github仓库名 element-plus-vite-starter
## git 提交规范
1. **主分支（Master/Main）**：
    - **名称**：通常被称为`master`或`main`分支。
    - **用途**：主分支是项目的稳定版本，应该始终处于可部署状态，并且代表了当前最新的生产版本。
2. **开发分支（Develop）**：
    - **名称**：通常被称为`develop`分支。
    - **用途**：开发分支是主要用于集成各种功能和修复的分支。所有新功能的开发都应该从这个分支开始，并且这个分支应该是所有其他功能分支的基础。
3. **功能分支（Feature）**：
    - **命名**：功能分支的命名通常以`feature/`开头，后跟具体功能的描述或名称。
    - **用途**：每个新功能应该在自己的功能分支上进行开发，这样可以隔离不同功能的开发，便于追踪和管理。完成开发后，功能分支可以合并到开发分支中。
4. **发布分支（Release）**：
    - **命名**：发布分支的命名通常以`release/`开头，后跟版本号或发布的名称。
    - **用途**：发布分支用于准备发布新版本。在这个分支上可以进行版本号的更新、文档的更新、最后的测试和修复等工作。一旦准备就绪，发布分支可以合并到主分支中，并且应该同时打上相应的标签以标记发布版本。
5. **修复分支（Hotfix）**：
    - **命名**：修复分支的命名通常以`hotfix/`开头，后跟修复内容的描述或问题编号。
    - **用途**：修复分支用于紧急修复生产环境中的问题。这些修复应该在一个单独的分支上进行，以确保不会影响当前正在开发的功能。修复完成后，修复分支应该合并到主分支和开发分支中。

| 前缀                | 描述                                                |
| ------------------- | --------------------------------------------------- |
| feat: :sparkles:    | 新功能                                              |
| fix: :bug:          | bug修复                                             |
| docs: :memo:        | 仅文档更改                                          |
| style: 🌈            | 不影响代码含义的更改（空白、格式设置、缺失 分号等） |
| refactor: :recycle: | 既不修复bug也不添加特性的代码更改                   |
| perf: 🚀             | 改进性能的代码更改                                  |
| test: 🧪             | 添加缺少的测试或更正现有测试                        |
| chore: :hammer:     | 对构建过程或辅助工具和库（如文档）的更改            |
| revert:↩️            | 回滚 commit                                         |


## 项目介绍

#### 功能介绍

1. 支持暗黑模式、设置主题
2. 支持设置主体展示动画
3. 支持修改页面布局
4. 支持拖拽页签
5. 响应式布局


### 目录介绍

```
├─api                           # 接口请求
├─assets                        # 静态资源
│  └─icons                      # icon 图标
├─components                    # 组件
│  ├─AppLink                    
│  └─SvgIcon
├─directive                     # 自定义指令
├─enums                         # 枚举
├─layout                        # laytou 布局
│  └─components                 
│      ├─AppMain                # 主内容
│      ├─Navbar                 # 顶部导航
│      │  └─components
│      ├─Settings               # 设置
│      │  └─componets
│      ├─Sidebar                # 侧边栏
│      │  └─components
│      ├─TagsView               # 标签页
│      └─Tour                   # 引导页
├─plugins                       # 插件
├─router                        # 路由
│  └─core                       # 路由核心配置
├─store                         # pinia 状态管理
│  └─modules                    # pinia 模块
├─styles                        # 样式
├─typings                       # 类型声明   
├─utils                         # 工具类
└─views                         # 页面
    ├─home
    ├─innerLink
    ├─nested
    │  └─level1
    │      └─level2
    ├─redirect                  # 内部页面跳转组件
    ├─templateOne
    └─time
```

## 使用教程

### 安装依赖

```
yarn install
```

### 运行项目

```
yarn run dev
```

### 部署项目
1. 打包项目
```
yarn run build
```
2. 上传项目到服务器

3. 配置 nginx 服务器

```
server {
        # 监听端口80
        listen 80;
        server_name  localhost;
        
        location / {
            # 例如 root /www/nginx/html/dist/
            root 您上传的项目路径;
            index index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
    }
```
