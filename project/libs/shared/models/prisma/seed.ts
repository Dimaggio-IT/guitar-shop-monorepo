// import { PrismaClient } from '@prisma/client';
// import { GuitarType, StringCount } from '../../core/src/index';

// const FIRST_PRODUCT_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
// const SECOND_PRODUCT_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';
// const THIRD_PRODUCT_UUID = 'cc38c0dc-750f-4015-8d2e-28f132fc861a';

// function getProducts() {
//   return [
//     {
//       id: FIRST_PRODUCT_UUID,
//       name: "VESTON C-50A SP/N 4/4",
//       description: "Классическая гитара 4/4",
//       photo: "https://showtehnica.ru/upload/resize_cache/iblock/569/340_340_1/gn02joyoflgq1odlxrc9rtoc1354pcpb.jpg",
//       type: GuitarType.Acoustics,
//       article: '111222',
//       stringCount: StringCount.Seven,
//       price: 8750,
//     },
//     {
//       id: SECOND_PRODUCT_UUID,
//       name: "WIKI UK/MATR",
//       description: "WIKI UK/MATR - гитара укулеле, сопрано",
//       photo: "https://showtehnica.ru/upload/resize_cache/iblock/def/340_340_1/0m979kodb6h7u2a5lwnbd6jassjaios9.jpg",
//       type: GuitarType.Ukukule,
//       article: '111333',
//       stringCount: StringCount.Four,
//       price: 3250,
//     },
//     {
//       id: THIRD_PRODUCT_UUID,
//       name: "FENDER PLAYER Telecaster MN Tidepool",
//       description: `"FENDER PLAYER Telecaster MN Tidepool, электрогитара цвет лазурь, материал корпуса - ольха, гриф - клён, накладка грифа - клен, количество ладов - 22, профиль грифа - Modern "C", звукосниматели SS: Player Series Alnico 5 Tele® Single-Coil"`,
//       photo: "https://showtehnica.ru/upload/resize_cache/iblock/37d/340_340_1/o6qk15jfwxan1xd4wnba130pl8ths9pw.jpg",
//       type: GuitarType.Electro,
//       article: '111444',
//       stringCount: StringCount.Twelve,
//       price: 128000,
//     },
//   ]
// }

// async function seedDb(prismaClient: PrismaClient) {
//   const mockProducts = getProducts();

//   for (const product of mockProducts) {
//     await prismaClient.product.upsert({
//       where: {id: product.id},
//       update: {},
//       create: {
//         id: product.id,
//         name: product.name,
//         description: product.description,
//         photo: product.photo,
//         type: product.type,
//         article: product.article,
//         stringCount: product.stringCount,
//         price: product.price,
//       }
//     })
//   }

//   console.info('🤘️ Database was filled');
// }

// async function bootstrap() {
//   const prismaClient = new PrismaClient();

//   try {
//     await seedDb(prismaClient);
//     globalThis.process.exit(0);
//   } catch (error: unknown) {
//     console.error(error);
//     globalThis.process.exit(1);
//   } finally {
//     await prismaClient.$disconnect();
//   }
// }

// bootstrap();
