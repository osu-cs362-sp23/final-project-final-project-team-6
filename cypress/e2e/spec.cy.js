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

describe('Chart data is maintained across pages', () => {
  it('successfully maintained', () => {
    cy.visit('/')
    cy.findByText("Line").click()
    cy.findByText("Chart title").type("test")
    cy.findByText("X label").type("test x")
    cy.findByText("Y label").type("test y")
    cy.findByText("X").type("1")
    cy.findByText("Y").type("1")
    //type into line then go to scatter to confirm

    cy.findByText("Scatter").click()
    // Get the input field element using its ID
    // Assert that the value of the input field is 'test'
    cy.get('#chart-title-input').should('have.value', 'test') 
    cy.get('#x-label-input').should('have.value', 'test x') 
    cy.get('#y-label-input').should('have.value', 'test y') 
    cy.get('.x-value-input').should('have.value', '1') 
    cy.get('.y-value-input').should('have.value', '1') 
    //done checking the scatter section.

    cy.findByText("Bar").click()
    cy.get('#chart-title-input').should('have.value', 'test') 
    cy.get('#x-label-input').should('have.value', 'test x') 
    cy.get('#y-label-input').should('have.value', 'test y') 
    cy.get('.x-value-input').should('have.value', '1') 
    cy.get('.y-value-input').should('have.value', '1') 
  })
})