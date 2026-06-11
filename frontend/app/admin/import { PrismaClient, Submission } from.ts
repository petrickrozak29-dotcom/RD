import { PrismaClient, Submission } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateSubmissionInput {
  title: string;
  description: string;
  featureType: 'EVENT' | 'WISATA' | 'KULINER';
  categoryName: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  image?: string;
  link?: string;
  priceRange?: string;
  date?: Date;
  submittedById?: string;
}

export const submissionService = {
  async createSubmission(input: CreateSubmissionInput): Promise<Submission> {
    const { categoryName, featureType, ...rest } = input;

    // Find or create category
    let category = await prisma.category.findFirst({
      where: { name: categoryName, featureType }
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName, featureType }
      });
    }

    return await prisma.submission.create({
      data: {
        ...rest,
        featureType,
        status: 'PENDING',
        categoryId: category.id,
      }
    });
  },

  async getSubmissions(filters?: { featureType?: string; status?: string; submittedById?: string }): Promise<Submission[]> {
    return await prisma.submission.findMany({
      where: filters,
      include: {
        category: true,
        submittedBy: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async updateStatus(id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED'): Promise<Submission> {
    return await prisma.submission.update({
      where: { id },
      data: { status }
    });
  },

  async deleteSubmission(id: string): Promise<Submission> {
    return await prisma.submission.delete({
      where: { id }
    });
  }
};
