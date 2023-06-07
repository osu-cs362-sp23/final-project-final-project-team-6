const sortPoints = require("./src/lib/sortPoints.js")

test("Sort points", function() {
    const inputs = [{x: 8, y: 2}, {x: 6, y: 2}]
    const output = sortPoints(inputs)
    expect(output).toStrictEqual([{"x": 6, "y": 2}, {"x": 8, "y": 2}])
})


test("Sort points", function() {
    const inputs = [{x: 6, y: 2}, {x: 8, y: 2}]
    const output = sortPoints(inputs)
    expect(output).toStrictEqual([{"x": 6, "y": 2}, {"x": 8, "y": 2}])
})