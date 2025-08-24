import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty({
    description: 'Id for user',
    example: '12'
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Full name of the user. Must be between 4 and 20 characters.',
    example: 'Anush Asatryan',
  })
  @IsString()
  @Length(4, 20)
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Email address of the user. Must be a valid email format.',
    example: 'mnacakanyan@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description:
      'Password for the account. Must be 6–20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    example: 'inchvorban@ssw0rd',
  })
  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;
}
