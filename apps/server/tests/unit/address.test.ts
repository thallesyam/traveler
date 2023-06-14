import { expect, test } from "vitest"

test("Deve criar um endereço válido", async () => {
  const address = new Address(
    "08225260",
    "Rua Francisco da cunha",
    "Jardim Itapemirim",
    "533"
  )
  expect(address.cep).toEqual("08225260")
  expect(address.street).toEqual("Rua Francisco da cunha")
  expect(address.number).toEqual("533")
  expect(address.coordinate).toEqual({ lat: 10, long: 10 })
})

test("Deve tentar criar um endereço faltando informações", async () => {
  expect(
    () =>
      new Address(
        "08225260",
        "Rua Francisco da cunha",
        "Jardim Itapemirim",
        "533"
      )
  ).toThrow(new Error("Insufficient information to create address"))
})
