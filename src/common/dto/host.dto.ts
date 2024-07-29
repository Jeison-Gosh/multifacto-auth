import { IsIP } from "class-validator";

export class hostHeaderDto {

    @IsIP(4,{each: false})
    host: string;
}