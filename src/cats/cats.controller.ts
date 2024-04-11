import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  UseGuards,
  Put,
  Delete 
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // Retrieves a list of all cats
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // Creates a new cat with admin role guard
  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  // Retrieves a single cat by ID
  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  // Updates a cat by ID with admin role guard
  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: any, @Body() updateCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  // Deletes a cat by ID with admin role guard
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: any): Promise<void> {
    return this.catsService.remove(id);
  }
}