import { Injectable } from '@nestjs/common';

@Injectable()
export class CodesService {
    private codes: Set<string>;
    constructor() {
        this.codes = new Set();
    }

    public generateUniqueCode(): string {
        let code: string;
        do {
            code = this.generateCode();
        } while (this.codes.has(code)); 
        this.codes.add(code);
        return code;
    }
    private generateCode(): string {
        return Array.from({ length: 8 }, () => {
            return Math.random().toString(36).charAt(2);
        }).join('');
    }
    public consumeCode(): string | null {
        const codeIterator = this.codes.values();
        const code = codeIterator.next().value;
        
        if (code) {
            this.codes.delete(code);
            return code;
        }
        return null; // No hay más códigos disponibles
    }

    public getAllCodes(): string[] {
        return Array.from(this.codes);
    }
}
