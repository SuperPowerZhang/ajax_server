
var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/
    // request.headers可以获得所有的请求头。请求体不好读
    console.log('勤奋的孩子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)


    response.statusCode = 200
    let type = {
        ".html": "text/html",
        ".css": "text/css",
        ".xml": "text/xml",
        ".js": "text/javascript",
        ".json": "text/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
    }
    // 用来设置返回字符集，不然可能乱码
    path = (path === "/" ? "/index.html" : path)
    let index = path.indexOf(".")
    let suffix = path.substring(index)
    response.setHeader('Content-Type', `${type[suffix] || "text/html"};charset=utf-8`)
    let content
    try {
        content = fs.readFileSync(`public/${path}`)

    } catch (error) {
        response.statusCode = 404
        content = response.statusCode + " + 文件不存在鸭~"

    }
    response.write(content)
    response.end()


    /******** 代码结束，下面不要看 ************/

})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
