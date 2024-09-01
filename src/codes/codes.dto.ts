import { IsString, IsArray } from 'class-validator';

export class GenerateCodeResponseDto {
  @IsString()
  code: string;
}

export class ConsumeCodeResponseDto {
  @IsString()
  code: string;
}

export class GetAllCodesResponseDto {
  @IsArray()
  codes: string[];
}
