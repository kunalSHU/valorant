const axios = require("axios");

const gqlQuery = `
query {
  message
}
  `;

describe("Testing basic endpoint", () => {
  it("Can fetch the test endpoint", async () => {
    try {
      const { data: response } = await axios.post(
        "http://localhost:8085/graphql",
        { query: gqlQuery },
        { headers: { "Content-Type": "application/json" } }
      );
      expect(response.data).toEqual({ message: "Hello World!" });
    } catch (error) {
      fail(error.message);
    }
  });
});
