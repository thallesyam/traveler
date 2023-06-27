import { expect, test } from "vitest"
import axios from "axios"

test("Deve testar o check-auth pela API", async () => {
  const inputLogin = {
    email: "thallesyam@gmail.com",
    password: "admin@123",
  }
  const response = await axios.post("http://localhost:3000/login", inputLogin)
  const { token } = response.data

  const inputAuth = {
    token,
  }

  const authResponse = await axios.post(
    "http://localhost:3000/check-auth",
    inputAuth
  )
  const { email } = authResponse.data
  expect(email).toBe(inputLogin.email)
})
