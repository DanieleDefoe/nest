import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const filename = v4() + '.jpg';
      console.log(filename);
      const filePath = resolve(__dirname, '..', 'static');
      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }
      writeFileSync(join(filePath, filename), file.buffer);
      return filename;
    } catch (e) {
      throw new HttpException(
        'An error occurred while creating a file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
