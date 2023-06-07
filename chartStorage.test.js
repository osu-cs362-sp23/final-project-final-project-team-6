/*
@jest-environment jsdom
*/

const chartStorage = require("./src/lib/chartStorage.js")

test("Load all saved charts", function() {
    const charts = chartStorage.loadAllSavedCharts()
    expect(charts).toStrictEqual([])
})