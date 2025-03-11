import { Test, TestingModule } from '@nestjs/testing';
import { CraController } from './cra.controller';

describe('CraController', () => {
  let controller: CraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CraController],
    }).compile();

    controller = module.get<CraController>(CraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
