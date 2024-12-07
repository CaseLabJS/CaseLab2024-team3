import { z } from 'zod';

export const TOKEN = 'token';
export const REFRESH_TOKEN = 'refreshToken';
export const TIME_TOKEN = 60 * 60 * 1000; //Время хранения токена

export const loginSchema = z.object({
  login: z.string().nonempty('Логин обязателен'),

  password: z.string().nonempty('Пароль обязателен'),
});
