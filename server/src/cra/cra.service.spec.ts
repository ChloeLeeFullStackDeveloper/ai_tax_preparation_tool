import { Test, TestingModule } from '@nestjs/testing';
import { CraService } from './cra.service';

describe('CraService', () => {
  let service: CraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CraService],
    }).compile();

    service = module.get<CraService>(CraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
