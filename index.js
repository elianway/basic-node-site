const fs = require('fs')
const http = require('http')

const allFiles = fs.readdirSync('./', { withFileTypes: true })

const htmlFiles = allFiles
  .filter((file) => {
    return /^.+\.(html|css)$/.test(file.name);
  })
  .map((file) => {
    if (file.name.endsWith(".html")) {
      if (file.name === "index.html") {
        return ""
      } else {
        return file.name.slice(0, -5)
      }
    } else {
      return file.name
    }
  })

const server = http.createServer((req, res) => {
  const requestedUrl = req.url.slice(1)
  if (htmlFiles.includes(requestedUrl)) {
    if (requestedUrl.endsWith(".css")) {
      const cssFile = fs.readFileSync("./" + requestedUrl, "utf8")
      res.setHeader("Content-Type", "text/css")
      res.end(cssFile)
    } else if (requestedUrl === "") {
        const index = fs.readFileSync("./index.html", "utf8")
        res.end(index)
    } else {
        const file = fs.readFileSync("./" + requestedUrl + ".html")
        res.end(file)
    }
  } else {
      const file = fs.readFileSync("./404.html", "utf8")
      res.end(file)
  }
})

server.listen(3000, () => {
  console.log("You're connected on port 3000")
})
