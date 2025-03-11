import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { TaxService } from './tax.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post('save')
  async saveTaxData(@Req() req, @Body() taxData: any) {
    return this.taxService.saveTaxData(req.user.uid, taxData);
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('calculate')
  async calculateTax(@Body() taxData: any) {
    return this.taxService.calculateTax(taxData);
  }
}
