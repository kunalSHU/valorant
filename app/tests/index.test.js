axios = require("axios");

describe("Testing basic endpoint", () => {
  const gqlQuery = `
  query {
    message
  }
    `;

  it("Can fetch the test endpoint", async () => {
    try {
      const { data: response } = await axios.post(
        "http://localhost:8080/graphql",
        { query: gqlQuery },
        { headers: { "Content-Type": "application/json" } }
      );
      expect(response.data).toEqual({ message: "Hello World!" });
    } catch (error) {
      fail(error.message);
    }
  });
});
