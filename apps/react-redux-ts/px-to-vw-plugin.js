// vite-plugin-px-to-vw.js  
export default function pxToVwPlugin(options = {}) {  
    // 默认选项  
    const { rootValue = 375, unitPrecision = 5, minPixelValue = 1, mediaQuery = false } = options;  

    return {  
        name: 'vite-plugin-px-to-vw',  
        transform(code, file) {  
            // 仅在 CSS 文件和 JS 文件中处理  
            if (/\.(css|vue|jsx|tsx)$/.test(file)) {  
                const result = code.replace(/(\d*\.?\d+)px/g, (match, p1) => {  
                    // 转换为vw  
                    const vwValue = (p1 / rootValue) * 100;  
                    return `${vwValue.toFixed(unitPrecision)}vw`;  
                });  

                return {  
                    code: result,  
                    map: null, // 如果需要 source map, 可以根据需求返回  
                };  
            }  
            
            return null; // 不变更其他文件  
        }  
    };  
}