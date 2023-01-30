import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Неверго указан email' })
	email: string;

	@IsString({ message: 'Не указан пароль' })
	password: string;
}
