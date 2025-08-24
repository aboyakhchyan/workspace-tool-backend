import { IsString, Length } from "class-validator";

export class WorkspaceNameDto {
    @IsString()
    @Length(4, 20)
    name: string
}