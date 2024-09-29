/** Test scripts are not independent meaning they are not intended to run in isolation 
    because we need to populate data first before retrieving and eventually deleting it
    Although it's not ideal for automation, left with no other option since we're just using free APIs available on the web
*/

/// <reference types="cypress" />

const orderIds = [];
const collection = () => orderIds;

describe("Creates single order", () => {

    it("Validates response status of creating multiple orders", function() {
        
        // Load the fixture data and wait for it to resolve
        cy.fixture('order').then((orderData) => {

          // Iterate over the array of orders
          orderData.forEach(order => {
            const uniqueId = Math.floor( Math.random() * 1000000);

            // Ensure each order has a unique ID if needed
            const modifiedOrder = { ...order };
            modifiedOrder.id = uniqueId
      
            const body = {
              "id": modifiedOrder.id,
              "petId": modifiedOrder.petId,
              "quantity": modifiedOrder.quantity,
              "shipDate": modifiedOrder.shipDate,
              "status": modifiedOrder.status,
              "complete": modifiedOrder.complete
            };
      
            // Perform the POST request
            cy.apiPost("/store/order", body)
              .then(response => {
                expect(response.status).to.eql(200);
                expect(response.body.id).to.equal(uniqueId);
              });
              orderIds.push(uniqueId)
          });
          cy.log(collection())
        });
      });   
});

describe("Retrieves single order", () => {

    it("Validate status code of retrieving single order using id", () => {
        cy.apiGet("/store/order/" + orderIds[0])
            .then(response => {
                expect(response.status).to.eql(200); // Status code should be 200
            });
    });


    it("Validate response time is less than 500 ms", () => {
        cy.apiGet('/store/order/' + orderIds[0])
            .then((response) => {
                expect(response.duration).to.be.lessThan(500); // Response time should be under 500ms
            });
    })


    it("Validate that the response body contains the expected structure", () => {
        cy.apiGet("/store/order/" + orderIds[0])
            .then(response => {
                expect(response.body).to.have.all.keys('id', 'petId', 'quantity', 'shipDate', 'status', 'complete');
            });
    });


    it("Validate shipdate format follows the expected ISO 8601 date format", () => {
        cy.apiGet("/store/order/" + orderIds[0])
            .then((response) => {
                const shipDate = response.body.shipDate;
                expect(shipDate).to.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\+0000/); // Check if the date format matches ISO 8601
            });
    });

    
    it("Validate responses status is 404 when requesting a non existent order", () => {
        cy.apiGet('/store/order/9999')
            .then((response) => {
                expect(response.status).to.equal(404);
                expect(response.body.message).to.contain('Order not found');
            });
    });


    it("Validate that the API can handle the maximum allowable order ID value", () => {
        cy.apiGet('/store/order/901949295')
            .then((response) => {
                expect(response.status).to.be.oneOf([200, 404]);
            });
    });
   

    it("Validate that the content-type header is application/json", () => {
        cy.apiGet('/store/order/' + orderIds[0])
            .then((response) => {
                expect(response.headers['content-type']).to.include('application/json');
            });
    });
      
    
    it("Validate that the API returns 405 when using invalid HTTP method", () => {
        const requestMethods = ["POST", "PUT"]
        const randomIndex = Math.floor(Math.random() * requestMethods.length);
        const randomRequestMethod = requestMethods[randomIndex];

        cy.apiGet('/store/order/' + orderIds[0], {method: randomRequestMethod})
            .then((response) => {
                expect(response.status).to.eql(405);
            });
    });
});


describe("Deletes single order", () => {
    it("Should successfully delete the order with the given id", () => {
        cy.apiDelete("/store/order/" + orderIds[0])
            .then((response) => {
                expect(response.status).to.eql(200);
            });
    });


    it("Should return 404 when fetching the deleted order", () => {
        cy.apiGet("/store/order/" + orderIds[0])
            .then((response) => {
                expect(response.status).to.eql(404);    //  Deleted order should not be found
            });
    });


    it("Should return 404 when deleting a non existent order", () => {
        cy.apiGet("/store/order/" + orderIds[0])
            .then((response) => {
                expect(response.status).to.eql(404);    
                expect(response.body.message).to.contain('Order not found');
            });
    });


    it("Validate the message when trying to delete an order with a non integer id", () => {
        cy.apiGet("/store/order/noninteger")
            .then((response) => {
                expect(response.body.message).to.contain('noninteger');
            });
    });    
});


