import { PrismaClient, SmartMagelangContent, Category } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateSmartMagelangContentInput {
  title: string;
  description: string;
  categoryName: string;
  sourceUrl?: string;
  image?: string;
}

export const smartMagelangService = {
  async getContentsByCategory(categoryName?: string): Promise<(SmartMagelangContent & { category: Category })[]> {
    return await prisma.smartMagelangContent.findMany({
      where: categoryName ? { category: { name: categoryName } } : undefined,
      include: {
        category: true
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async createContent(input: CreateSmartMagelangContentInput): Promise<SmartMagelangContent> {
    const { categoryName, ...rest } = input;

    // Find or create category specifically for SMART_MAGELANG
    let category = await prisma.category.findFirst({
      where: { name: categoryName, featureType: 'SMART_MAGELANG' }
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName, featureType: 'SMART_MAGELANG' }
      });
    }

    return await prisma.smartMagelangContent.create({
      data: {
        ...rest,
        categoryId: category.id
      }
    });
  },

  async deleteContent(id: string): Promise<SmartMagelangContent> {
    return await prisma.smartMagelangContent.delete({
      where: { id }
    });
  }
};
