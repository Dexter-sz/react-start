const componentExists = require('../utils/componentExists');
module.exports = {
    description: '添加一个 container , 一般用于模块，为多个单元组件的集合',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '命名：',
            default: 'IndexPage',
            validate: value => {
                if (/.+/.test(value)) {
                    return componentExists(value)
                        ? '已存在该命名的 Container.'
                        : true;
                }

                return 'Container Name 不能为空';
            },
        },
    ],
    actions: data => {
        // Generate index.js and index.test.js

        const actions = [
            {
                type: 'add',
                path: '../../src/container/{{properCase name}}/index.tsx',
                templateFile: './container/index.js.hbs',
                abortOnFail: true,
            },
            {
                type: 'add',
                path: '../../src/container/{{properCase name}}/index.scss',
                templateFile: './container/index.scss.hbs',
                abortOnFail: true,
            },
            {
                type: 'add',
                path: '../../src/container/{{properCase name}}/index.d.ts',
                templateFile: './container/index.d.ts.hbs',
                abortOnFail: true,
            },
        ];

        return actions;
    },
};
