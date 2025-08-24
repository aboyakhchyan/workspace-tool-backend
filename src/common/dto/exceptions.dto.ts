import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class BaseExceptionDto {
  @ApiProperty()
  @IsString()
  timestamp: string;

  @ApiProperty()
  @IsString()
  path: string;
}


export class BadRequestExceptionDto extends BaseExceptionDto {
  @ApiProperty({example: 'Example` Something went wrong'})
  @IsString({})
  message: string;

  @ApiProperty({example: 'Bad Request'})
  @IsString()
  error: string;

  @ApiProperty({example: 400})
  @IsInt()
  statusCode: number;
}

export class UnauthorizedExceptionDto extends BaseExceptionDto {
  @ApiProperty({example: 'Example` Something went wrong'})
  @IsString()
  message: string;

  @ApiProperty({example: 'Unauthorized'})
  @IsString()
  error: string;

  @ApiProperty({example: 401})
  @IsInt()
  statusCode: number;
}

export class ForbiddenExceptionDto extends BaseExceptionDto {
  @ApiProperty({example: 'Example` Something went wrong'})
  @IsString()
  message: string;

  @ApiProperty({example: 'Forbidden'})
  @IsString()
  error: string;

  @ApiProperty({example: 403})
  @IsInt()
  statusCode: number;
}

export class NotFoundExceptionDto extends BaseExceptionDto {
  @ApiProperty({example: 'Example` Something went wrong'})
  @IsString()
  message: string;

  @ApiProperty({example: 'Not Found'})
  @IsString()
  error: string;

  @ApiProperty({example: 404})
  @IsInt()
  statusCode: number;
}

export class InternalServerExceptionDto extends BaseExceptionDto {
  @ApiProperty({example: 'Example` Something went wrong'})
  @IsString()
  message: string;

  @ApiProperty({example: 'Internal Server Error'})
  @IsString()
  error: string;

  @ApiProperty({example: 500})
  @IsInt()
  statusCode: number;
}
