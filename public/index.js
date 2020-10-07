console.log(111);

let request = new XMLHttpRequest()
request.open("GET", "/index.css")
request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
        console.log(request.response)
        let style = document.createElement('style')
        style.innerHTML = request.response
        document.head.appendChild(style)
    }
    // else {
    //     //这里会打印出失败, 因为状态从1-4一直被监听着
    // }
}
request.send()

let request1 = new XMLHttpRequest()
request1.open('GET', '/main.js')
request1.onreadystatechange = () => {
    if (request1.readyState === 4 && request1.status === 200) {
        let script = document.createElement('script')
        script.innerHTML = request1.response
        document.body.appendChild(script)
    }
    request1.send()
}

let request2 = new XMLHttpRequest()
request2.open('GET', '/ajax.html')
request2.onreadystatechange = () => {
    if (request2.readyState === 4 && request2.status === 200) {
        let div = document.createElement('div')
        div.innerHTML = request2.response
        document.body.appendChild(div)
    }
}
request2.send()

let request3 = new XMLHttpRequest()
request3.open('GET', '/index.xml')
request3.onreadystatechange = () => {
    if (request3.readyState === 4 && request3.status === 200) {
        let xml = request3.responseXML.getElementsByTagName("warning")[0]
        let text = xml.textContent.trim()
        window.xml.innerHTML = text

    }
}
request3.send()

let request4 = new XMLHttpRequest()
request4.open('GET', '/x.json')
request4.onreadystatechange = () => {
    if (request4.readyState === 4 && request4.status === 200) {
        let string = request4.response
        let obj = JSON.parse(string)
        json.innerHTML = string
        console.log(obj);
    }
}
request4.send()

let n = 1
let ul = document.querySelector("#page ul")
next.addEventListener("click", () => {
    let request5 = new XMLHttpRequest()
    request5.open('GET', `/${n}.json`)
    request5.onreadystatechange = () => {
        if (request5.readyState === 4 && request5.status === 200) {
            let arr = JSON.parse(request5.response)
            arr.forEach(item => {
                let li = document.createElement("li")
                li.innerHTML = item.id
                ul.appendChild(li)
            });
        }
    }
    request5.send()
    n = n + 1
    if (n >= 4) {
        next.disabled = "disabled"
    }
})