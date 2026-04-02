import { Test, TestingModule } from '@nestjs/testing';
import { ScriptController } from './script.controller';
import { ScriptService } from './script.service';

describe('ScriptController', () => {
  let scriptController: ScriptController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ScriptController],
      providers: [ScriptService],
    }).compile();

    scriptController = app.get<ScriptController>(ScriptController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(scriptController.getHello()).toBe('Hello World!');
    });
  });
});
