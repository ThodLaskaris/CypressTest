    import { navigateTo } from "../support/page_objects/navigationPage"
    import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
    import { submitDate } from "../support/page_objects/formLayoutsPage"

    describe('Test with Page Objects', () => {

        beforeEach('open application', () => {
            cy.visit('/')
        })

        it('verify navigations across the pages', () => {
            navigateTo.formLayoutsPage()
            navigateTo.datepickerPage()
            navigateTo.smartTablePage()
            navigateTo.tooltipPage()
            navigateTo.tosterPage()
        })

        it('should submit inline and basic form and select tomorrow date in the calendar', () => {
            navigateTo.formLayoutsPage()
            onFormLayoutsPage.submitInlineFormWithNameAndEmail('Thodoris', 'test@test.com')
        })

        it('should submit the basic form and select email and password click checkbox and after submit the form', () => {
            navigateTo.formLayoutsPage()
            onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', '12312123')
        })

        it.only('should select the next day date in the calendar', () => {
            navigateTo.formLayoutsPage()
            navigateTo.datepickerPage()
            onFormLayoutsPage.submitDate("1")
        })
    })