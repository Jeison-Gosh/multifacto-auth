import { ValidationPipe, BadRequestException } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
    protected flattenValidationErrors(validationErrors: any[]): string[] {
        return validationErrors.map(error => `${error.property} has wrong value ${error.value}, ${error.constraints[Object.keys(error.constraints)[0]]}`);
    }
}
