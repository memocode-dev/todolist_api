import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class Validation {
  static async validate<T>(input: T, dtoClass: new () => T) {
    const entity = plainToInstance(dtoClass, input);
    try {
      await validateOrReject(entity as object);
    } catch (errors) {
      console.log(errors);
      throw new BadRequestException(errors[0]);
    }
  }
}
