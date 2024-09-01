import { Controller, Get, Post } from '@nestjs/common';
import { CodesService } from './codes.service';
import { GenerateCodeResponseDto, ConsumeCodeResponseDto, GetAllCodesResponseDto } from './codes.dto';

@Controller('codes')
export class CodesController {

    constructor(
        private readonly codesService: CodesService,
    ) { }

    @Post('generate')
    generateCode(): GenerateCodeResponseDto {
        const res: GenerateCodeResponseDto = { code: this.codesService.generateUniqueCode() };
        return res;
    }

    @Post('consume')
    consumeCode(): ConsumeCodeResponseDto {
        const code = this.codesService.consumeCode();
        return { code: code ? code : 'No more codes available' };
    }

    @Get('all')
    getAllCodes(): GetAllCodesResponseDto {
        const res: GetAllCodesResponseDto = { codes: this.codesService.getAllCodes() };
        return res;
    }
}
