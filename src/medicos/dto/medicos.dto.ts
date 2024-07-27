import { IsOptional, IsNumber } from "class-validator";

export class FiltroDTO {
    @IsOptional()
    sort?: string;

    @IsOptional()
    orderBy?: string;
    
    @IsOptional()
    especialidade?: string;

    @IsNumber()
    @IsOptional()
    avaliacao?: number;

    @IsNumber()
    @IsOptional()
    distancia?: number;
}