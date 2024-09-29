/**Cypress.Commands.add("apiGet", (url, queryParams = {}, options = {}) => { //
    const {method = "GET" } = options; //keeps the method in options parameter to make it capable of overriding HTTP method
    return cy.request({
      "failOnStatusCode": false,
      method,
      url,
      qs: queryParams,
      headers:{
        'Content-Type': "application/json",
        'x-http-authorization': myGlobalAuth
      }
    })
  })*/


Cypress.Commands.add("apiPost", (url, body) => {
    return cy.request({
        method: "POST",
        url,
        headers:{

        },
        body
    });
});

Cypress.Commands.add("apiGet", (url, options = {}) => {
    const {method = "GET" } = options;      //keeps the method in options parameter to make it capable of overriding HTTP method
    return cy.request({
        "failOnStatusCode": false,
        method,
        url,
        headers:{

        }
    });
});

Cypress.Commands.add("apiDelete", (url) => {
  return cy.request({
      "failOnStatusCode": false,
      method: "DELETE",
      url,
      headers:{

      },
  });
});