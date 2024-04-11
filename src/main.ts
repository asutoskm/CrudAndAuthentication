import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Bootstrap function to initialize the application
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    // Set up global validation pipes for input validation
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    
    // Start listening for incoming requests on port 3000
    await app.listen(3000);
  } catch (err) {
    // Ideally, log the error using a logging service or library
    console.error('Error during application initialization', err);
    process.exit(1);
  }
}

// Start the application
bootstrap();