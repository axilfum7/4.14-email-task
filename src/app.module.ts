import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './service/service.service';


@Module({
  imports: [UserModule, AuthModule, ProductsModule, ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}