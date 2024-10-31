
describe("SignInTab Component", () => {
  
    beforeEach(() => {
      cy.visit("/auth"); // Update with the actual route for the sign-in page
    });
  
    // it("displays the form and allows user input", () => {
    //   cy.get("input[placeholder='Enter your email']").type("test@example.com");
    //   cy.get("input[placeholder='Enter your password']").type("password123");
    // });
  
    // it("shows validation error if email or password is missing", () => {
    //   // Attempt to submit without email
    //   cy.get("button[type='submit']").click();
    //   cy.contains("Please enter a valid email").should("be.visible");
  
    //   // Fill email only, then submit
    //   cy.get("input[placeholder='Enter your email']").type("test@example.com");
    //   cy.get("button[type='submit']").click();
    //   cy.contains("Please enter a password").should("be.visible");
    // });
  
    it("logs in with valid credentials", () => {
      // Mock sign-in request
      cy.intercept("POST", "/api/auth/callback/credentials", {
        statusCode: 200,
        body: { success: true },
      }).as("signInRequest");
  
      cy.get("input[placeholder='Enter your email']").type("ronnshart@gmail.com");
      cy.get("input[placeholder='Enter your password']").type("123456");
  
      // Submit form
      cy.get("button[type='submit']").click();
  
      // Check for successful navigation and toast
      cy.url().should("include", "/"); // Assumes redirect to home
    //   cy.contains("Login successfully").should("be.visible");
    });
  
 
});