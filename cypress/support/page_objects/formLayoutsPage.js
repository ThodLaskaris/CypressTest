

export class FormLayoutsPage {

    submitInlineFormWithNameAndEmail(name, email) {
        cy.contains('nb-card', 'Inline form')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[placeholder="Jane Doe"]')
                    .type(name)
                cy.wrap(form)
                    .find('[placeholder="Email"]')
                    .type(email)
                cy.wrap(form)
                    .find('[type="checkbox"]')
                    .check({ force: true })
                cy.wrap(form)
                    .submit()
            })
    }

    submitBasicFormWithEmailAndPassword(email, password) {
        cy.contains('nb-card', 'Basic form')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('#exampleInputEmail1')
                    .type(email)

                cy.wrap(form)
                    .find('#exampleInputPassword1')
                    .type(password)

                cy.wrap(form)
                    .find('.custom-checkbox')
                    .click({ force: true })

                cy.wrap(form)
                    .submit()

            })
    }

    submitDate(day, placeholder = "Form Picker") {
        // const nextDay = new Date();
        // nextDay.setDate(nextDay.getDate() + 1);
        // const day = nextDay.getDate()

        cy.contains('nb-card', 'Common Datepicker')
            .find('[placeholder="Form Picker"]')
            .click();

        cy.get('.day-cell')
            .contains(day)
            .click({ force: true })
    }
    
}

export const onFormLayoutsPage = new FormLayoutsPage();