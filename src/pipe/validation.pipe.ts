import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value);
    const errors = validateSync(obj);

    if (errors.length) {
      const messages = errors.map((error) => {
        return `${error.property} - ${Object.values(error.constraints).join(', ')}`;
      });

      throw new ValidationException(messages);
    }

    return value;
  }
}
