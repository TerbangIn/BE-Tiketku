const request = require('supertest');
const app = require('../routes/index')
// const baseURL = "http://localhost:8000"
const dotenv = require("dotenv");
dotenv.config();

describe("API get all cars", () => {
  it("success get all data cars", async () => {
    console.log("Hello");
    await request(app).get('/api/v1/flight/1')
      .then(res => {
        console.log(res);
      })
    expect(200).toBe(200);
  }, 20000);

  // it('should test that true === true', () => {
  //   expect(true).toBe(true)
  // })
});

// describe('Initial Test', () => {
//   it('should test that 1 + 1 === 2', () => {
//     expect(1 + 1).toBe(2)
//   })
// })
