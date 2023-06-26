import { PrismaClient } from "@prisma/client"
import { Address, Category, Comment, Local } from "@/domain/entities"
import { LocalRepository } from "@/application/repositories"

type IHours = {
  openingHours: {
    weekDay: number
    open: number | null
    close: number | null
  }[]
}

export class LocalRepositoryDatabase implements LocalRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(local: Local): Promise<void> {
    await this.prisma.local.create({
      data: {
        name: local.name,
        description: local.description,
        images: local.images,
        address: { ...local.address },
        slug: local.slug,
        rating: local.getRating() ?? 0,
        openingHours: { openingHours: local.openingHours },
        category: {
          connect: {
            id: local.category.getCategoryId(),
          },
        },
        city: {
          connect: {
            id: local.cityId,
          },
        },
        isHightlight: local.getIsHightlight(),
        observation: local.observation,
      },
      include: {
        category: true,
        city: true,
      },
    })
  }

  async findAll(): Promise<Local[]> {
    const locals = await this.prisma.local.findMany({
      include: { category: true, city: true, comment: true },
    })

    if (!locals.length) {
      return []
    }

    return locals.map((local) => {
      const addressData = local.address as unknown as Address
      const { openingHours } = local.openingHours as unknown as IHours

      const address = new Address(
        addressData.cep,
        addressData.street,
        addressData.neighborhood,
        addressData.number,
        addressData.coordinate
      )
      const category = new Category(
        local.category?.name as string,
        local.category?.image as string
      )
      category.setCategoryId(local.categoryId)
      const comments = local.comment.map((comment) => {
        const commentToEntity = new Comment(
          comment.name,
          comment.image,
          comment.text,
          comment.rating,
          comment.localId as string
        )
        commentToEntity.setCommentId(comment.id)
        if (comment.status !== null) {
          commentToEntity.setStatus(
            comment.status === true ? "approved" : "reproved"
          )
        }
        return commentToEntity
      })

      const localToEntity = new Local(
        local.name,
        local.description,
        local.images as string[],
        address,
        openingHours,
        local.cityId,
        category,
        local?.observation ?? ""
      )
      localToEntity.setLocalId(local.id)
      comments.map((comment) => localToEntity.setComment(comment))
      localToEntity.calculateRating()
      return localToEntity
    })
  }

  async findById(id: string): Promise<Local> {
    const local = await this.prisma.local.findUnique({
      where: { id },
      include: { category: true, city: true, comment: true },
    })
    if (!local) {
      throw new Error("Local not found")
    }
    const addressData = local.address as unknown as Address
    const { openingHours } = local.openingHours as unknown as IHours

    const address = new Address(
      addressData.cep,
      addressData.street,
      addressData.neighborhood,
      addressData.number,
      addressData.coordinate
    )
    const category = new Category(
      local.category?.name as string,
      local.category?.image as string
    )
    category.setCategoryId(local.categoryId)
    const comments = local.comment.map((comment) => {
      const commentToEntity = new Comment(
        comment.name,
        comment.image,
        comment.text,
        comment.rating,
        comment.localId as string
      )
      commentToEntity.setCommentId(comment.id)
      if (comment.status !== null) {
        commentToEntity.setStatus(
          comment.status === true ? "approved" : "reproved"
        )
      }
      return commentToEntity
    })

    const localToEntity = new Local(
      local.name,
      local.description,
      local.images as string[],
      address,
      openingHours,
      local.cityId,
      category,
      local?.observation ?? ""
    )
    localToEntity.setLocalId(local.id)
    comments.map((comment) => localToEntity.setComment(comment))
    return localToEntity
  }

  async findBySlug(slug: string): Promise<Local> {
    const local = await this.prisma.local.findFirst({
      where: { slug },
      include: { category: true, city: true, comment: true },
    })
    if (!local) {
      throw new Error("Local not found")
    }
    const addressData = local.address as unknown as Address
    const { openingHours } = local.openingHours as unknown as IHours

    const address = new Address(
      addressData.cep,
      addressData.street,
      addressData.neighborhood,
      addressData.number,
      addressData.coordinate
    )
    const category = new Category(
      local.category?.name as string,
      local.category?.image as string
    )
    category.setCategoryId(local.categoryId)
    const comments = local.comment.map((comment) => {
      const commentToEntity = new Comment(
        comment.name,
        comment.image,
        comment.text,
        comment.rating,
        comment.localId as string
      )
      commentToEntity.setCommentId(comment.id)
      if (comment.status !== null) {
        commentToEntity.setStatus(
          comment.status === true ? "approved" : "reproved"
        )
      }
      return commentToEntity
    })

    const localToEntity = new Local(
      local.name,
      local.description,
      local.images as string[],
      address,
      openingHours,
      local.cityId,
      category,
      local?.observation ?? ""
    )
    localToEntity.setLocalId(local.id)
    comments.map((comment) => localToEntity.setComment(comment))
    localToEntity.calculateRating()
    return localToEntity
  }

  async findByCityId(cityId: string): Promise<Local[]> {
    const locals = await this.prisma.local.findMany({
      where: { cityId },
      include: { category: true, city: true, comment: true },
    })
    if (!locals) {
      throw new Error("Local not found")
    }
    return locals.map((local) => {
      const addressData = local.address as unknown as Address
      const { openingHours } = local.openingHours as unknown as IHours

      const address = new Address(
        addressData.cep,
        addressData.street,
        addressData.neighborhood,
        addressData.number,
        addressData.coordinate
      )
      const category = new Category(
        local.category?.name as string,
        local.category?.image as string
      )
      category.setCategoryId(local.categoryId)
      const comments = local.comment.map((comment) => {
        const commentToEntity = new Comment(
          comment.name,
          comment.image,
          comment.text,
          comment.rating,
          comment.localId as string
        )
        commentToEntity.setCommentId(comment.id)
        if (comment.status !== null) {
          commentToEntity.setStatus(
            comment.status === true ? "approved" : "reproved"
          )
        }
        localToEntity.calculateRating()
        return commentToEntity
      })

      const localToEntity = new Local(
        local.name,
        local.description,
        local.images as string[],
        address,
        openingHours,
        local.cityId,
        category,
        local?.observation ?? ""
      )
      localToEntity.setLocalId(local.id)
      comments.map((comment) => localToEntity.setComment(comment))
      return localToEntity
    })
  }

  async update(id: string, data: Local): Promise<void> {
    await this.prisma.local.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        images: data.images,
        address: { ...data.address },
        slug: data.slug,
        rating: data.getRating() ?? 0,
        openingHours: { openingHours: data.openingHours },
        categoryId: data.category.getCategoryId(),
        isHightlight: data.getIsHightlight(),
        observation: data.observation,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.local.delete({ where: { id } })
  }
}
