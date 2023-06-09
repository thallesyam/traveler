import { expect, test } from "vitest"
import { Password } from "@/domain/entities"

const PASSWORD_HASH =
  "f1fa680348802c16e610e0afa109ef9fd2ea21001bf0449ea4372229cee93a13c3eb08a30068a92b82d376d195f5ed4bebfd9b51413a0ae23dbb38da9141a4b4"

test("Deve criar uma senha", async function () {
  const password = await Password.create("12345678", "salt")
  expect(password.value).toBe(PASSWORD_HASH)
  expect(password.salt).toBe("salt")
})

test("Deve criar uma senha sem enviar o salt", async function () {
  const password = await Password.create("12345678")
  expect(password).not.toBeUndefined()
})

test("Deve tentar criar uma senha inválida", async function () {
  expect(
    async () => await Password.create("123456", "salt")
  ).rejects.toThrowError(new Error("Invalid password"))
})
