import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';

async function createAdminUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    // Tạo user admin
    const admin = await usersService.create(
      'admin',
      'admin@pokemon.com',
      'admin123', // Lưu ý: Đây chính là mật khẩu đúng
    );

    console.log('✅ Admin user created successfully:');
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('ID:', admin.id);
  } catch (error) {
    if (error.message.includes('đã tồn tại')) {
      console.log('ℹ️  Admin user already exists');
    } else {
      console.error('❌ Error creating admin user:', error.message);
    }
  } finally {
    await app.close();
  }
}

createAdminUser();
