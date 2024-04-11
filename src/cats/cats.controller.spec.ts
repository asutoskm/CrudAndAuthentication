import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

// Group tests for CatsController
describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  // Setup for each test case
  beforeEach(async () => {
    // Create a module with CatsController and CatsService
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    // Retrieve instances of CatsController and CatsService
    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  // Test suite for findAll method
  describe('findAll', () => {
    it('should return an array of cats', async () => {
      // Expected result setup
      const result: Cat[] = [
        {
          age: 2,
          breed: 'Bombay',
          name: 'Pixel',
        },
      ];
      // Mock the findAll method of catsService to return the expected result
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result as any);;

      // Assert that catsController.findAll returns the expected result
      expect(await catsController.findAll()).toBe(result);
    });
  });
});