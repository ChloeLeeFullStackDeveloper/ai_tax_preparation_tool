import { Module } from '@nestjs/common';
import { TaxController } from './tax.controller';
import { TaxService } from './tax.service';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [AuthModule], // Add this line to import AuthModule
  controllers: [TaxController],
  providers: [TaxService],
})
export class TaxModule {}
