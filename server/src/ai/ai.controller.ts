import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post('suggestions')
  generateSuggestions(@Body() data: { taxData: any; calculationResults: any }) {
    return this.aiService.generateTaxSuggestions(
      data.taxData,
      data.calculationResults,
    );
  }
}
