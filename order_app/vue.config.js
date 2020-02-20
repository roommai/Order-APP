module.exports = {
    configureWebpack: {
        resolve: {
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
                'index':'@/views/index/childComps',
            },
        },
        
    },
    chainWebpack: config => {
        //删除编译后的独立js文件上的预获取操作
		config.plugins.delete("prefetch");
    },
    devServer: {
		// 默认会自动打开浏览器
		// open: true
    },
}