import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TaxModule } from './tax/tax.module';
import { AiModule } from './ai/ai.module';
import { CraModule } from './cra/cra.module';

@Module({
  imports: [AuthModule, UsersModule, TaxModule, AiModule, CraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
