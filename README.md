# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 状态管理 (Dva)

本项目使用Dva作为状态管理库，Dva是一个基于redux和redux-saga的数据流解决方案。

### 模型结构

所有的状态模型都存放在`src/modal`目录下:

```
src/modal/
  ├── global.ts      // 全局状态
  ├── user.ts        // 用户状态
  └── index.ts       // 导出并注册所有模型
```

### 使用方法

在组件中使用状态：

```tsx
import { connect } from 'dva';
import { GlobalState } from '@modal/global';
import { UserState } from '@modal/user';

interface ComponentProps {
  global: GlobalState;
  user: UserState;
  loading: {
    effects: Record<string, boolean>;
  };
  dispatch: any;
}

const MyComponent: React.FC<ComponentProps> = ({ 
  global, 
  user, 
  loading, 
  dispatch 
}) => {
  // 使用状态
  const { notices } = global;
  const { currentUser } = user;
  
  // 分发action
  const handleSomeAction = () => {
    dispatch({
      type: 'global/fetchNotices',
    });
  };
  
  return (
    <div>
      {/* 组件内容 */}
    </div>
  );
};

export default connect(({ global, user, loading }) => ({
  global,
  user,
  loading,
}))(MyComponent);
```

### 创建新模型

在`src/modal`目录下创建新的模型文件，然后在`src/modal/index.ts`中导入并注册：

```ts
// src/modal/newModel.ts
import { Effect, Model, Reducer } from '../types/dva';
import { AnyAction } from 'redux';

export interface NewModelState {
  // 状态类型定义
}

export interface NewModel extends Model {
  namespace: 'newNamespace';
  state: NewModelState;
  effects: {
    // 定义effects
  };
  reducers: {
    // 定义reducers
  };
}

const NewModel: NewModel = {
  namespace: 'newNamespace',
  
  state: {
    // 初始状态
  },
  
  effects: {
    // 异步操作
  },
  
  reducers: {
    // 同步操作，用于更新状态
  },
};

export default NewModel;
```

然后在`src/modal/index.ts`中注册新模型：

```ts
// src/modal/index.ts
import NewModel from './newModel';

// ...
app.model(NewModel);
```

## 路径别名配置

本项目配置了以下路径别名，方便开发时引入模块：

```ts
// 引入示例
import { Component } from '@components/SomeComponent';
import MainLayout from '@layout';
import { useWindowSize } from '@hooks';
import { formatDate } from '@utils';
```

可用的路径别名：

| 别名 | 路径 | 说明 |
|-----|-----|-----|
| `@` | `src` | 项目源码根目录 |
| `@components` | `src/components` | 组件目录 |
| `@layout` | `src/layout` | 布局组件目录 |
| `@pages` | `src/pages` | 页面组件目录 |
| `@styles` | `src/style` | 样式文件目录 |
| `@utils` | `src/utils` | 工具函数目录 |
| `@hooks` | `src/hooks` | 自定义Hooks目录 |
| `@assets` | `src/assets` | 资源文件目录 |
| `@services` | `src/services` | 服务/API目录 |
| `@types` | `src/types` | 类型定义目录 |
| `@store` | `src/store` | 状态管理目录 |
| `@modal` | `src/modal` | Dva模型目录 |

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
