import 'dotenv/config';
import prisma from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'test@example.com';
  const plainPassword = 'password123';
  
  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  
  // ユーザーの作成（すでに存在する場合はスキップ）
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword, // 念のためパスワードを更新
    },
    create: {
      email,
      password: hashedPassword,
    },
  });
  
  console.log('✅ テストユーザーを作成/更新しました:');
  console.log(`Email: ${user.email}`);
  console.log(`Password: ${plainPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
