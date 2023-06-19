import { expect, test } from "vitest"
import { Category } from "@/domain/entities"

test("Deve criar uma categoria válida", async () => {
  const category = new Category("Pontos Turísticos", "fake-images")
  expect(category.name).toEqual("Pontos Turísticos")
  expect(category.image).toEqual("fake-images")
  expect(category.setLocalInCategory("fake-id", "fake-id"))
  expect(category.getLocalsInCategory()).toHaveLength(1)
  expect(category.getCategoryId()).toBeTruthy()
})

test("Deve tentar criar um endereço faltando informações", async () => {
  expect(() => new Category("Pontos Turísticos", "")).toThrow(
    new Error("Insufficient information to create category")
  )
})
