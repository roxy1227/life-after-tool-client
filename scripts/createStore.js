#!/usr/bin/env node

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// 获取命令行参数
const args = process.argv.slice(2);

// 自定义错误输出函数
function showError(message) {
    console.error(`\x1b[31m%s\x1b[0m`, `错误: ${message}`);
}

// 检查是否提供了 storeName 参数
if (args.length === 0) {
    showError("缺少参数，请提供 store 名称。");
    console.log("\x1b[33m%s\x1b[0m", "用法: yarn createStore <storeName>");
    process.exit(0);
}

const storeName = args[0];
const storePath = join(process.cwd(), 'src', 'store', storeName);

// 创建目录
if (!existsSync(storePath)) {
    mkdirSync(storePath, { recursive: true });
    console.log(`\x1b[32m%s\x1b[0m`, `已创建目录: ${storePath}`);
} else {
    showError(`目录已存在: ${storePath}`);
    process.exit(0);
}

// 定义 index.ts 文件内容
const indexContent = `
import { proxy } from "valtio";
import { State, FormItem } from "./type";

const state = proxy<State>({
    form_item: {} as FormItem
});

const reducer = {
    setFormItem: (form_item: FormItem) => {
        state.form_item = form_item;
    }
};

export default {
    state,
    reducer
};
`;

// 定义 type.ts 文件内容
const typeContent = `
export interface State {
    form_item: FormItem;
}

export interface FormItem {
    name: string;
    age: number;
    gender: string;
}
`;

// 写入 index.ts 文件
writeFileSync(join(storePath, 'index.ts'), indexContent.trim());
console.log(`\x1b[32m%s\x1b[0m`, `已创建文件: ${join(storePath, 'index.ts')}`);

// 写入 type.ts 文件
writeFileSync(join(storePath, 'type.ts'), typeContent.trim());
console.log(`\x1b[32m%s\x1b[0m`, `已创建文件: ${join(storePath, 'type.ts')}`);