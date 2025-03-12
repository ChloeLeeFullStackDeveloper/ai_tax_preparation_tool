import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TaxModule } from './tax/tax.module';
import { AiModule } from './ai/ai.module';
import { CraModule } from './cra/cra.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    AuthModule,
    UsersModule,
    TaxModule,
    AiModule,
    CraModule,
  ],
})
export class AppModule {}
