
let componentGenerator = require('./component/index.js');
let componentFnGenerator = require('./component_fn/index.js');
let containerGenerator = require('./container/index.js');

module.exports = function (plop) {
    plop.setGenerator('component', componentGenerator);
    plop.setGenerator('component_fn', componentFnGenerator);
    plop.setGenerator('container', containerGenerator);
};
