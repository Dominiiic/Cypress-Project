/// <reference types="cypress" />

describe("Get pet details", () => {
    before(() => {
        cy.fixture("pet").as("pet");

        cy.get("@pet").then((petData) => {
            // Directly use fixtureData to post to the /pet endpoint
            cy.apiPost("/pet", petData)
        });
        
    });


    it("Verify that the pet was successfully added to the store.", () => {
        cy.apiGet("/pet/5")
            .then(response => {
                expect(response.status).to.eql(200);
            })
    });

    it("Verify all allowed pet status", () => {
        // Array of allowed status values
        const allowedStatuses = ["available", "sold", "pending"];
      
        cy.apiGet("/pet/findByStatus?status=available,sold,pending").then((response) => {
      
          // Iterate over each pet in the response body
          response.body.forEach((pet) => {
            // Check that the status of each pet is one of the allowed statuses
            expect(allowedStatuses).to.include(pet.status);
          });
        });
      });
      

    it("Verify if pets information are accurately displayed based on its status", () => {
        const status = ["available", "pending", "sold"];
        const selectedStatus = status[Math.floor(Math.random() * 3)];

        cy.apiGet("/pet/findByStatus?status=" + selectedStatus).then(response => {
            //  Loop through each object's status and assert if values are in the status array
            response.body.forEach((pet) => {  
                expect(pet).to.have.property("status", selectedStatus);
            });
        });
    });

    it("Verify if response body is an array of objects for different statuses", () => {
        cy.apiGet("/pet/findByStatus?status=available,sold,pending").then(response => {
            expect(response.body).to.be.an("array");
        })
    });
});


describe("Delete pet", () => {
    it("Verify succesful deletion of pet through pet id", () => {
        cy.apiDelete("/pet/5").then((response) => {
            expect(response.status).to.eql(200);
        });
    });


    it("Verify retrieving not existing pet id return error 404", () => {
        cy.apiDelete("/pet/5").then((response) => {
            expect(response.status).to.eql(404);
        });
    });


    it("", () => {

    });
});