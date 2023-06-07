/*const generateChartImg = require("./src/lib/generateChartImg.js")

test("Generate chart image", function() {
    const inputs = [{x: 1, y: 1}, {x: 2, y: 4}, {x: 4, y: 16}]
    const output = generateChartImg("bar", inputs, "exampleX", "exampleY", "title", "blue")
    expect(output).not.toBe("")
})*/

const fs = require("fs")
const rest = require("msw").rest
const setupServer = require("msw/node").setupServer
const genChartImg = require("./src/lib/generateChartImg")

const quickchartResults = fs.readFileSync("./stupidmeme.jpg")

const server = setupServer(
    rest.get(
        "https://quickchart.io/chart",
        function (req, res, ctx) {
            return res(ctx.body(quickchartResults))
        }
    )
)

beforeAll(function () {
    server.listen()
})

afterAll(function () {
    server.close()
})

test("Returns image", function() {
    const url = genChartImg
    expect(url).not.toBe("")
})