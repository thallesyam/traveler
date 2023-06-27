import { expect, test } from "vitest"
import axios from "axios"

test("Deve testar o login pela API", async () => {
  const input = {
    email: "thallesyam@gmail.com",
    password: "admin@123",
  }

  const response = await axios.post("http://localhost:3000/login", input)
  const { token } = response.data
  expect(token).toBeTruthy()
})
