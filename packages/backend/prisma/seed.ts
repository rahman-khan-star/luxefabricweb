const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@luxefabrics.com' },
    update: {},
    create: {
      email: 'admin@luxefabrics.com',
      name: 'Admin',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'silk' },
      update: {},
      create: { name: 'Silk & Satin', slug: 'silk', description: 'Luxurious silk and satin fabrics' },
    }),
    prisma.category.upsert({
      where: { slug: 'cotton' },
      update: {},
      create: { name: 'Cotton & Linen', slug: 'cotton', description: 'Breathable cotton and linen fabrics' },
    }),
    prisma.category.upsert({
      where: { slug: 'velvet' },
      update: {},
      create: { name: 'Velvet', slug: 'velvet', description: 'Rich velvet fabrics' },
    }),
    prisma.category.upsert({
      where: { slug: 'chiffon' },
      update: {},
      create: { name: 'Chiffon', slug: 'chiffon', description: 'Flowing chiffon fabrics' },
    }),
    prisma.category.upsert({
      where: { slug: 'organza' },
      update: {},
      create: { name: 'Organza', slug: 'organza', description: 'Sheer organza fabrics' },
    }),
  ]);
  console.log('✅ Categories created');

  // Create brand
  const brand = await prisma.brand.upsert({
    where: { slug: 'luxe-originals' },
    update: {},
    create: { name: 'Luxe Originals', slug: 'luxe-originals' },
  });

  // Create products
  const products = [
    { name: 'Royal Silk Organza', slug: 'royal-silk-organza', price: 8999, compareAt: 12999, categoryId: categories[0].id, brandId: brand.id, sku: 'SLK-001', description: 'Premium quality silk organza, perfect for elegant evening wear and bridal collections.' },
    { name: 'Heritage Linen Blend', slug: 'heritage-linen', price: 5499, categoryId: categories[1].id, brandId: brand.id, sku: 'COT-001', description: 'A beautiful linen blend that offers comfort and style for all seasons.' },
    { name: 'Midnight Velvet', slug: 'midnight-velvet', price: 7250, categoryId: categories[2].id, brandId: brand.id, sku: 'VLT-001', description: 'Luxurious velvet with a rich, deep pile. Perfect for formal wear and home decor.' },
    { name: 'Cloud Cotton Voile', slug: 'cloud-cotton', price: 3499, categoryId: categories[1].id, brandId: brand.id, sku: 'COT-002', description: 'Lightweight cotton voile, ideal for summer dresses and blouses.' },
    { name: 'Emperor Brocade', slug: 'emperor-brocade', price: 12999, compareAt: 18999, categoryId: categories[0].id, brandId: brand.id, sku: 'SLK-002', description: 'Exquisite brocade fabric with intricate metallic patterns.' },
    { name: 'Breeze Chiffon', slug: 'breeze-chiffon', price: 4499, categoryId: categories[3].id, brandId: brand.id, sku: 'CHF-001', description: 'Ethereal chiffon that drapes beautifully for flowing garments.' },
    { name: 'Crystal Organza', slug: 'crystal-organza', price: 6200, categoryId: categories[4].id, brandId: brand.id, sku: 'ORG-001', description: 'Shimmering organza with crystal-like transparency.' },
    { name: 'Royal Velvet Premium', slug: 'royal-velvet-premium', price: 9500, categoryId: categories[2].id, brandId: brand.id, sku: 'VLT-002', description: 'Our finest velvet, imported from Italy.' },
  ];

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...p,
        isPublished: true,
        isFeatured: true,
        variants: {
          create: [
            { sku: `${p.sku}-BL-S`, name: `${p.name} - Black S`, price: p.price, compareAt: p.compareAt, size: 'S', color: 'Black', colorHex: '#000000' },
            { sku: `${p.sku}-BL-M`, name: `${p.name} - Black M`, price: p.price, compareAt: p.compareAt, size: 'M', color: 'Black', colorHex: '#000000' },
            { sku: `${p.sku}-BL-L`, name: `${p.name} - Black L`, price: p.price, compareAt: p.compareAt, size: 'L', color: 'Black', colorHex: '#000000' },
            { sku: `${p.sku}-WH-S`, name: `${p.name} - White S`, price: p.price, compareAt: p.compareAt, size: 'S', color: 'White', colorHex: '#FFFFFF' },
            { sku: `${p.sku}-WH-M`, name: `${p.name} - White M`, price: p.price, compareAt: p.compareAt, size: 'M', color: 'White', colorHex: '#FFFFFF' },
            { sku: `${p.sku}-RD-M`, name: `${p.name} - Red M`, price: p.price, compareAt: p.compareAt, size: 'M', color: 'Red', colorHex: '#EF4444' },
          ],
        },
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=1000&fit=crop', sortOrder: 0 },
            { url: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&h=1000&fit=crop', sortOrder: 1 },
          ],
        },
      },
    });
    console.log(`  ✅ Product: ${product.name}`);
  }

  // Create coupons
  await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: { code: 'WELCOME10', description: '10% off first order', discountType: 'PERCENTAGE', discountValue: 10, maxUses: 1000 },
  });
  await prisma.coupon.upsert({
    where: { code: 'FLAT500' },
    update: {},
    create: { code: 'FLAT500', description: 'Rs 500 off orders over Rs 5000', discountType: 'FIXED', discountValue: 500, minOrder: 5000, maxUses: 500 },
  });
  console.log('✅ Coupons created');

  console.log('\n🎉 Seeding complete!');
  console.log('📧 Admin email: admin@luxefabrics.com');
  console.log('🔑 Admin password: admin123');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
