import applyDecoratedDescriptor from '@babel/runtime/helpers/es6/applyDecoratedDescriptor'
import initializerDefineProperty from '@babel/runtime/helpers/es6/initializerDefineProperty'

Object.assign(babelHelpers, {
  applyDecoratedDescriptor,
  initializerDefineProperty,
});

require('./src');