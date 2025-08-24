import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateWorkspaceDto {
  @IsString()
  @Length(4, 20)
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string
}
