const componentExists = require('../utils/componentExists');
module.exports = {
  description: '添加一个 component , 一般用于单元组件',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '命名：',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? '已存在该命名的 Component.'
            : true;
        }

        return 'Component Name 不能为空';
      },
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js

    const actions = [
      {
        type: 'add',
        path: '../../src/component/{{properCase name}}/index.tsx',
        templateFile: './component/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../src/component/{{properCase name}}/index.scss',
        templateFile: './component/index.scss.hbs',
        abortOnFail: true,
      },
      {
            type: 'add',
            path: '../../src/component/{{properCase name}}/index.d.ts',
            templateFile: './component/index.d.ts.hbs',
            abortOnFail: true,
        },
    ];

    return actions;
  },
};
