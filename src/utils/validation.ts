import { validateOrReject } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export class Validation {
  static async validate<T>(input: T, dtoClass: new () => T) {
    const entity = plainToInstance(dtoClass, input);
    try {
      await validateOrReject(entity as object);
    } catch (errors) {
      throw new BadRequestException('Validation failed!', errors);
    }
  }
}
