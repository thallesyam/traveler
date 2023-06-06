import { test, expect } from "vitest"

import User from "@/domain/entities/user"

test("Deve realizar o login com sucesso", async () => {
  const user = new User("Thalles Ian", "thallesyam@gmail.com", "admin@123")
  const userRepository = new UserRepositoryMemory()
  userRepository.save(user)
  const input = {
    email: user.email,
    password: user.password,
  }
  const login = new Login(userRepository)
  const token = await login.execute(input)
  expect(token).toBe("123")
})
