const tsc = require('typescript');

const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');
const es2015 = require('babel-preset-es2015');
const stage3 = require('babel-preset-stage-3');

module.exports = {
    process: function (src, path) {
        if (path.endsWith('.ts') || path.endsWith('.tsx')) {
            var es6Code = tsc.transpile(
                src,
                {
                    target: tsc.ScriptTarget.ES6,
                    module: tsc.ModuleKind.CommonJS,
                    jsx: tsc.JsxEmit.React
                },
                path,
                []
            );
            return babel.transform(es6Code, {
                auxiliaryCommentBefore: ' istanbul ignore next ',
                    presets: [jestPreset, es2015, stage3],
                retainLines: true
            }).code;
        }
        return src;
    }
};