describe('Venture Capital Network Visualization', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('loads the application', () => {
    cy.contains('Venture Capital Network Visualization').should('be.visible')
  })

  it('displays the filter controls', () => {
    cy.contains('Location').should('be.visible')
    cy.contains('Company').should('be.visible')
    cy.contains('Investors').should('be.visible')
  })

  it('displays the network graph', () => {
    cy.get('svg').should('be.visible')
  })

  it('displays the data summary', () => {
    cy.contains('Data Summary').should('be.visible')
    cy.contains('Total Companies').should('be.visible')
    cy.contains('Total Investors').should('be.visible')
    cy.contains('Avg. Valuation').should('be.visible')
  })

  it('allows filtering of data', () => {
    cy.contains('Location').click()
    cy.contains('Select Country...').click()
    cy.contains('USA').click()
    // Add assertions to check if the graph and summary update accordingly
  })

  it('allows exporting of filtered data', () => {
    cy.contains('Export Filtered Data').click()
    // Add assertions to check if the CSV file is downloaded
  })
})

