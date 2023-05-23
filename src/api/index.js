
const modulesFiles = require.context('./request', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')

    const value = modulesFiles(modulePath)

    modules[moduleName] = value.default

    return modules

}, {})

const Api = {
    ...modules
}

export default Api