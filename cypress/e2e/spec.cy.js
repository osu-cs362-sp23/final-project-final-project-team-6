describe('Chart is correctly generated', () => {
  it('Line chart generated', () => {
    cy.visit('/')
    cy.findByText("Line").click()
    cy.findByText("Chart title").type("test")
    cy.findByText("X label").type("test x")
    cy.findByText("Y label").type("test y")
    cy.findByText("X").type("1")
    cy.findByText("Y").type("1")
    cy.findByText("Generate chart").click()
    cy.get('[id="chart-img"]').should('exist')
    //checks the line chart image exists.
  })
  it('Scatter plot generated', () => {
    cy.visit('/')
    cy.findByText("Scatter").click()
    cy.findByText("Chart title").type("test")
    cy.findByText("X label").type("test x")
    cy.findByText("Y label").type("test y")
    cy.findByText("X").type("1")
    cy.findByText("Y").type("1")
    cy.findByText("Generate chart").click()
    cy.get('[id="chart-img"]').should('exist')
    //checks the scatter plot image exists.
  })
  it('Bar graph generated', () => {
    cy.visit('/')
    cy.findByText("Bar").click()
    cy.findByText("Chart title").type("test")
    cy.findByText("X label").type("test x")
    cy.findByText("Y label").type("test y")
    cy.findByText("X").type("1")
    cy.findByText("Y").type("1")
    cy.findByText("Generate chart").click()
    cy.get('[id="chart-img"]').should('exist')
    //checks the bar graph image exists.
  })
})