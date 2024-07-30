import { Controller, Get, Post } from '@nestjs/common'
import { CodesService } from './codes.service';

@Controller('codes')
export class CodesController {

    constructor(private readonly codesService: CodesService) {
        this.codesService = codesService
    }

    // [ACTUALIZAR] se debe cammbiar los tipos de respuestas a DTO.
    @Post('generate')
    generateCode(): any {
        const res = { code: this.codesService.generateUniqueCode() }
        return res
    }
    @Post('consume')
    consumeCode(): string {
        const code = this.codesService.consumeCode();
        return code ? code : 'No more codes available';
    }

    @Get('all')
    getAllCodes(): any {
        const res = { codes: this.codesService.getAllCodes() }
        return res
    }
}
