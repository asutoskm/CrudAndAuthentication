import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { CatsModule } from '../../src/cats/cats.module';
import { CatsService } from '../../src/cats/cats.service';
import { CoreModule } from '../../src/core/core.module';

// Define the suite for Cats module e2e tests
describe('Cats', () => {
  // Mock implementation of the CatsService
  const catsServiceMock = { findAll: () => ['test'] };

  let app: INestApplication;

  // Setup the Nest application for testing before all tests
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      // Import the necessary modules for the test
      imports: [CatsModule, CoreModule],
    })
      // Override the CatsService with a mock to isolate the test environment
      .overrideProvider(CatsService)
      .useValue(catsServiceMock)
      .compile();

    // Create the Nest application instance from the testing module
    app = moduleRef.createNestApplication();
    // Initialize the application
    await app.init();
  });

  // Test case for GET request on /cats endpoint
  it(`/GET cats`, () => {
    // Perform a GET request, expect a 200 status code and the mock data in response
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect({
        data: catsServiceMock.findAll(),
      });
  });

  // Tear down the application after all tests
  afterAll(async () => {
    await app.close();
  });
});