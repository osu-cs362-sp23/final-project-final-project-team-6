/**
 * @jest-environment jsdom
 */

require("@testing-library/jest-dom/extend-expect"); // jest-dom library
const domTesting = require("@testing-library/dom"); // DOM Testing Library
const userEvent = require("@testing-library/user-event").default; // User Event Library 

const initDomFromFiles = require("../utils/initDomFromFiles");

test("Correctly adds values in the line chart builder", async() => {
    initDomFromFiles(
            __dirname + "/../../src/line/line.html",
            __dirname + "/../../src/line/line.js"
    );
    const addValues = domTesting.getByText(document, "+");
    var timesClicked = 0; // number of times "+" has been clicked
    // arrays for each input field
    let inputFieldX = domTesting.getAllByLabelText(document, "X");
    let inputFieldY = domTesting.getAllByLabelText(document, "Y");
    const user = userEvent.setup();

    // enter data into initial input fields
    await user.type(inputFieldX[0], "0");
    await user.type(inputFieldY[0], "0");

    // click the button 5 times & add input to each field
    for (var i = 1; i < 6; i++) {
        await user.click(addValues);
        timesClicked++;
        // redefine arrays to include new fields
        inputFieldX = domTesting.getAllByLabelText(document, "X");
        inputFieldY = domTesting.getAllByLabelText(document, "Y");
        // enter data into new fields
        await user.type(inputFieldX[i], `${i}`);
        await user.type(inputFieldY[i], `${i}`);
    }

    // there should be one more input field pair than generated with button
    expect(inputFieldX.length).toEqual(timesClicked+1);
    expect(inputFieldY.length).toEqual(timesClicked+1);

    // user-entered data should not be impacted
    for (var i = 0; i < 6; i++) {
        expect(inputFieldX[i].value).toMatch(`${i}`);
        expect(inputFieldY[i].value).toMatch(`${i}`);
    }
});

describe("Alert tests for line chart builder", () => {
    // clear local storage
    beforeEach(() => {
        window.localStorage.clear()
    }); 

    test("Displays correct alert for no input data", async() => {
        initDomFromFiles(
            __dirname + "/../../src/line/line.html",
            __dirname + "/../../src/line/line.js"
        );
        const axisLabelX = domTesting.getByLabelText(document, "X label");
        const axisLabelY = domTesting.getByLabelText(document, "Y label");
        const inputFieldX = domTesting.getByLabelText(document, "X");
        const inputFieldY = domTesting.getByLabelText(document, "Y");
        const generateChart = domTesting.getByText(document, "Generate chart");
        const user = userEvent.setup();
        
        // populate partial input
        await user.type(axisLabelX, "X-Axis");
        await user.type(axisLabelY, "Y-Axis");
        expect(inputFieldX.value).toMatch("");
        expect(inputFieldY.value).toMatch("");

        // use a spy on alert
        const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        // generate chart
        await user.click(generateChart);
        // alert should have been called with specific message
        expect(alert).toHaveBeenCalled();
        expect(window.alert).toBeCalledWith("Error: No data specified!");

    });
    // restore the spy created with spyOn
    afterEach(() => {
        jest.restoreAllMocks();
    });
    // clear local storage
    beforeEach(() => {
    window.localStorage.clear()
    }) ;
    
    test("Displays correct alert for no y-axis input", async() => {
        initDomFromFiles(
            __dirname + "/../../src/line/line.html",
            __dirname + "/../../src/line/line.js"
        );
        const axisLabelX = domTesting.getByLabelText(document, "X label");
        const axisLabelY = domTesting.getByLabelText(document, "Y label");
        const inputFieldX = domTesting.getByLabelText(document, "X");
        const inputFieldY = domTesting.getByLabelText(document, "Y");
        const generateChart = domTesting.getByText(document, "Generate chart");
        const user = userEvent.setup();

        // populate partial input
        await user.type(inputFieldX, "6");
        await user.type(inputFieldY, "9");
        await user.type(axisLabelX, "X-Axis");
        expect(axisLabelY.value).toMatch("");

        // use a spy on alert
        const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        // generate chart
        await user.click(generateChart);
        // alert should have been called with specific message
        expect(alert).toHaveBeenCalled();
        expect(window.alert).toBeCalledWith("Error: Must specify a label for both X and Y!");
    });
    // restore the spy created with spyOn
    afterEach(() => {
        jest.restoreAllMocks();
    });
    // clear local storage
    beforeEach(() => {
    window.localStorage.clear()
    });

    test("Displays correct alert for no x-axis input", async() => {
        initDomFromFiles(
            __dirname + "/../../src/line/line.html",
            __dirname + "/../../src/line/line.js"
        );
        
        const axisLabelX = domTesting.getByLabelText(document, "X label");
        const axisLabelY = domTesting.getByLabelText(document, "Y label");
        const inputFieldX = domTesting.getByLabelText(document, "X");
        const inputFieldY = domTesting.getByLabelText(document, "Y");
        const generateChart = domTesting.getByText(document, "Generate chart");
        const user = userEvent.setup();

        // alert should have been called with specific message
        await user.type(inputFieldX, "6");
        await user.type(inputFieldY, "9");
        await user.type(axisLabelY, "Y-Axis");
        expect(axisLabelX).toBeEmptyDOMElement();

        // use a spy on alert
        const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        // generate chart
        await user.click(generateChart);
        // alert should have been called with specific message
        expect(alert).toHaveBeenCalled();
        expect(window.alert).toBeCalledWith("Error: Must specify a label for both X and Y!");
    });
});

test("All fields clear/reset correctly for line chart builder", async() => {
    initDomFromFiles(
        __dirname + "/../../src/line/line.html",
        __dirname + "/../../src/line/line.js"
    );
    const axisLabelX = domTesting.getByLabelText(document, "X label");
    const axisLabelY = domTesting.getByLabelText(document, "Y label");
    let inputFieldX = domTesting.getAllByLabelText(document, "X");
    let inputFieldY = domTesting.getAllByLabelText(document, "Y");
    const clearChartBtn = domTesting.getByText(document, "Clear chart data");
    const chartColor = domTesting.getByLabelText(document, "Chart color");
    const chartTitle = domTesting.getByLabelText(document, "Chart title");
    const addValues = domTesting.getByText(document, "+");
    const user = userEvent.setup();

    // populate some chart data
    await user.type(chartTitle, "My Line Chart");
    await user.type(axisLabelX, "X-Axis");
    await user.type(axisLabelY, "Y-Axis");
    await domTesting.fireEvent.change(chartColor, {target: {value: '#FFF'}});
    await user.type(inputFieldX[0], "20");
    await user.type(inputFieldY[0], "15");
    for (var i = 1; i < 11; i++) {
        await user.click(addValues);
        inputFieldX = domTesting.getAllByLabelText(document, "X");
        inputFieldY = domTesting.getAllByLabelText(document, "Y");
        await user.type(inputFieldX[i], `${i}`);
        await user.type(inputFieldY[i], `${i}`);
    };
    // clear chart
    await user.click(clearChartBtn);
    // redefine arrays to include updated fields
    inputFieldX = domTesting.getAllByLabelText(document, "X");
    inputFieldY = domTesting.getAllByLabelText(document, "Y");

    // everything should be cleared / reset
    expect(chartTitle).toBeEmptyDOMElement();
    expect(axisLabelX).toBeEmptyDOMElement();
    expect(axisLabelY).toBeEmptyDOMElement();
    expect(inputFieldX.length).toEqual(1);
    expect(inputFieldY.length).toEqual(1);
    expect(inputFieldX[0]).toBeEmptyDOMElement();
    expect(inputFieldY[0]).toBeEmptyDOMElement();
    expect(chartColor.value).toEqual("#ff4500"); // default color
});

test("Data is correctly sent to chart generation function", async() => {
    const axisLabelX = domTesting.getByLabelText(document, "X label");
    const axisLabelY = domTesting.getByLabelText(document, "Y label");
    let inputFieldX = domTesting.getAllByLabelText(document, "X");
    let inputFieldY = domTesting.getAllByLabelText(document, "Y");
    const chartTitle = domTesting.getByLabelText(document, "Chart title");
    const user = userEvent.setup();

     // populate some chart data
     await user.type(chartTitle, "My Chart");
     await user.type(axisLabelX, "X-Axis");
     await user.type(axisLabelY, "Y-Axis");
     await user.type(inputFieldX[0], "20");
     await user.type(inputFieldY[0], "15");

    // mock function module
    jest.mock(__dirname + "/../../src/lib/generateChartImg", function () {
        // stub to return valid image url
        return jest.fn().mockResolvedValue("http://placekitten.com/480/480");
    });
});