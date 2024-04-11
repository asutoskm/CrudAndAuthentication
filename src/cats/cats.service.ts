// cats.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
  ) {}

  /**
   * Retrieves all cat records from the database.
   * @returns An array of Cat entities.
   */
  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  /**
   * Creates a new cat record in the database.
   * @param createCatDto The DTO containing the data for the new cat.
   * @returns The newly created Cat entity.
   */
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = this.catsRepository.create(createCatDto);
    return this.catsRepository.save(cat);
  }

  /**
   * Finds a single cat record by its ID.
   * @param id The ID of the cat to find.
   * @returns The found Cat entity.
   * @throws NotFoundException if no cat is found.
   */
  async findOne(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOne({ where: { id } });
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    return cat;
  }

  /**
   * Updates a cat record in the database.
   * @param id The ID of the cat to update.
   * @param updateCatDto The DTO containing the updated data for the cat.
   * @returns The updated Cat entity.
   */
  async update(id: number, updateCatDto: CreateCatDto): Promise<Cat> {
    const cat = await this.findOne(id);
    const updatedCat = Object.assign(cat, updateCatDto);
    return this.catsRepository.save(updatedCat);
  }

  /**
   * Removes a cat record from the database.
   * @param id The ID of the cat to remove.
   */
  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }
}