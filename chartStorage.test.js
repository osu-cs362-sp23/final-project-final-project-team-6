/*
@jest-environment jsdom
*/

const chartStorage = require("./src/lib/chartStorage.js")

beforeEach(() => {
    window.localStorage.clear()
})

test("Load all saved charts before anything is loaded", function() {
    const charts = chartStorage.loadAllSavedCharts()
    expect(charts).toStrictEqual([])
})

test("Push a chart and then load it", function() {
    const chart = [{"x": 6, "y": 2}, {"x": 8, "y": 2}, {"x": 9, "y": 4}]
    chartStorage.saveChart(chart)
    const savedChart = chartStorage.loadSavedChart(0)
    expect(savedChart).toStrictEqual([{"x": 6, "y": 2}, {"x": 8, "y": 2}, {"x": 9, "y": 4}])
})

test("Push two saved charts and then load the second one", function () {
    const chartOne = [{"x": 6, "y": 2}, {"x": 8, "y": 2}, {"x": 9, "y": 4}]
    chartStorage.saveChart(chartOne)
    const chartTwo = [{"x": 1, "y": 2}, {"x": 2, "y": 3}, {"x": 3, "y": 5}]
    chartStorage.saveChart(chartTwo)
    const savedChart = chartStorage.loadSavedChart(1)
    expect(savedChart).toStrictEqual([{"x": 1, "y": 2}, {"x": 2, "y": 3}, {"x": 3, "y": 5}])
})

test("Push two saved charts and then load all of them", function () {
    const chartOne = [{"x": 6, "y": 2}, {"x": 8, "y": 2}, {"x": 9, "y": 4}]
    chartStorage.saveChart(chartOne)
    const chartTwo = [{"x": 1, "y": 2}, {"x": 2, "y": 3}, {"x": 3, "y": 5}]
    chartStorage.saveChart(chartTwo)
    const savedCharts = chartStorage.loadAllSavedCharts()
    expect(savedCharts).toStrictEqual([[{"x": 6, "y": 2}, {"x": 8, "y": 2}, {"x": 9, "y": 4}],
        [{"x": 1, "y": 2}, {"x": 2, "y": 3}, {"x": 3, "y": 5}]])
})

test("Update and load current data", function() {
    const chart = [{"x": 6, "y": 2}, {"x": 8, "y": 2}, {"x": 9, "y": 4}]
    chartStorage.updateCurrentChartData(chart)
    const currentData = chartStorage.loadCurrentChartData()
    expect(currentData).toStrictEqual([{"x": 6, "y": 2}, {"x": 8, "y": 2}, {"x": 9, "y": 4}])
})