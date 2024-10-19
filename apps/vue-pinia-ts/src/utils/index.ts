/**
 * 单例模式
 *
 * @description 单例函数，用于创建单例类
 * @param {class} className 类名
 */
export function singleton<T>(className: any) {
  let instance: any = null;
  const proxy = new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        // instance = new target(...args); // 写法1
        instance = Reflect.construct(target, args); // 写法1
      }
      return instance;
    },
  });
  // 修复原型链，防止在其他文件中通过new mc.constructor()创建新的实例
  proxy.prototype.constructor = proxy;
  return proxy as T;
}

