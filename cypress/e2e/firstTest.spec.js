/// <reference types="cypress" />

describe('First test suite', () => {


    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms')
            .click()
        cy.contains('Form Layouts')
            .click()

        //by tagName
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by class
        cy.get('.input-full-width')

        // by attribute
        cy.get('[fullwidth]')

        // by attribute with value

        cy.get('[placeholder="Email"]')

        // by  class value

        cy.get('[class="input-full-width size-medium shape-rectangle"]')


        // by two attributes
        cy.get('[placeholder="Email"][fullwidth]')


        //by tag, attribute id and class

        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // by cypress test ID

        cy.get('[data-cy="imputEmail1"]')

    })
    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms')
            .click()
        cy.contains('Form Layouts')
            .click()
        // get() find elements on the page by locator globally
        // find() find child elements by locator
        //  contains9) find HTML text and by text and locator
        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form')
            .find('button')
        cy.contains('nb-card', 'Horizontal form')
            .contains('Sign in')
        cy.contains('nb-card', 'Horizontal form')
            .get('button') // no matter what will find all the buttons 


        // cy chains and DOM 
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })

    it('save object of the command', () => {
        cy.visit('/')
        cy.contains('Forms')
            .click()
        cy.contains('Form Layouts')
            .click()

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputEmail1"]')
            .should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputPassword2"]')
            .should('contain', 'Password')

        // Cant do things as this bellow.
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]')
        //     .should('contain', 'Email')

        // 1. Cypress Alias

        cy.contains('nb-card', 'Using the Grid').as('usingTheGridAlias')
        cy.get('@usingTheGridAlias')
            .find('[for="inputEmail1"]')
            .should('contain', 'Email')
        cy.get('@usingTheGridAlias')
            .find('[for="inputPassword2"]')
            .should('contain', 'Password')

        //  2. Using the Cypress commands ( then() methods )

        cy.contains('nb-card', 'Using the Grid')
            .then(usingTheGridForm => {
                cy.wrap(usingTheGridForm)
                    .find('[for="inputEmail1"]')
                    .should('contain', 'Email')
            })
    })

    it('extract text values', () => {
        cy.visit('/')
        cy.contains('Forms')
            .click()
        cy.contains('Form Layouts')
            .click()
        // Extract text values from the Page
        // 1.
        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')

        // 2. jQuery  
        cy.get('[for="exampleInputEmail1"]')
            .then(label => {
                const labelText = label.text()
                expect(labelText).to.equal('Email address')
                cy.wrap(labelText)
                    .should('contain', 'Email address')
            })

        // 3. Cypress Invoke     
        cy.get('[for="exampleInputEmail1"]')
            .invoke('text')
            .then(text => {
                expect(text).to.equal('Email address')
            })
        cy.get('[for="exampleInputEmail1"]')
            .invoke('text')
            .as('labelTextAlias')
            .then(text => {
                expect(text).to.equal('Email address')
            })

        //4. invoke attribute

        cy.get('[for="exampleInputEmail1"]')
            .invoke('attr', 'class')
            .then(classValue => {
                expect(classValue).to.equal('label')
            })
        //5. invoke property

        cy.get('#exampleInputEmail1')
            .type('thodoris@thodoris.gr')

        cy.get('#exampleInputEmail1')
            .invoke('prop', 'value')
            .should('contain', 'thodoris@thodoris.gr')
            .then(propertyValue => {
                expect(propertyValue).to.equal('thodoris@thodoris.gr')
            })



    })
    it('radio buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid')
            .find('[type="radio"]')
            .then(radioButtons => {
                // Επιλέγουμε το πρώτο
                cy.wrap(radioButtons)
                    .eq(0)
                    .check({ force: true })
                    .should('be.checked')

                // Επιλέγουμε το δεύτερο
                cy.wrap(radioButtons)
                    .eq(1)
                    .check({ force: true })
                    .should('be.checked')

                // Ελέγχουμε ότι το πρώτο ΔΕΝ είναι πια επιλεγμένο
                cy.wrap(radioButtons)
                    .eq(0)
                    .should('not.be.checked')

                // Το τρίτο radio button πρέπει να είναι απενεργοποιημένο
                cy.wrap(radioButtons)
                    .eq(2)
                    .should('be.disabled')
            })
    })

    it('checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays')
            .click()
        cy.contains('Toastr')
            .click()

        cy.get('[type="checkbox"]')
            .uncheck({ force: true })

        cy.get('[type="checkbox"]')
            .eq(0)
            .click({ force: true })
    })


    it.only('Date picker', () => {
        cy.visit('/')
        cy.contains('Forms')
            .click()
        cy.contains('Datepicker')
            .click()

        let date = new Date()
        date.setDate(date.getDate() + 2)
        let futureDate = date.getDate()
        let dateToAssert = `Sep ${futureDate}, 2023`

        console.log(date)

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input)
                    .click()

                cy.get('.day-cell')
                    .not('.bounding-month')
                    .contains(futureDate)
                    .click()

                cy.wrap(input)
                    .invoke('prop', 'value')
                    .should('contain', dateToAssert)

                cy.wrap(input)
                    .should('have.value', dateToAssert)
            })
    })
})
