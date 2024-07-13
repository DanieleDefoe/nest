import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  const { PORT = 5000 } = process.env;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`),
  );
};

start();
