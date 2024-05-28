import { PrismaClient } from '@prisma/client';

const FIRST_PRODUCT_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_PRODUCT_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';
const THIRD_PRODUCT_UUID = 'cc38c0dc-750f-4015-8d2e-28f132fc861a';

function getProducts() {
  return [
    {
      id: FIRST_PRODUCT_UUID,
    },
    {
      id: SECOND_PRODUCT_UUID,
    },
    {
      id: THIRD_PRODUCT_UUID,
    },
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockProducts = getProducts();

  for (const product of mockProducts) {
    await prismaClient.product.create({
      data: {
        id: product.id,
      }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
