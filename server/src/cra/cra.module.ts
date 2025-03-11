import { Module } from '@nestjs/common';
import { CraController } from './cra.controller';
import { CraService } from './cra.service';

@Module({
  controllers: [CraController],
  providers: [CraService]
})
export class CraModule {}
