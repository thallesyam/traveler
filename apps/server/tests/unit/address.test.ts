import { expect, test } from "vitest"
import { Address } from "@/domain/entities"

test("Deve criar um endereço válido", async () => {
  const address = new Address(
    "08225260",
    "Rua Francisco da cunha",
    "Jardim Itapemirim",
    "533",
    { lat: 10, long: 10 }
  )
  expect(address.cep).toEqual("08225260")
  expect(address.street).toEqual("Rua Francisco da cunha")
  expect(address.number).toEqual("533")
  expect(address.getCoordinate()).toEqual({ lat: 10, long: 10 })
})

test("Deve tentar criar um endereço faltando informações", async () => {
  expect(() => new Address("", "", "", "", { lat: 0, long: 0 })).toThrow(
    new Error("Insufficient information to create address")
  )
})
