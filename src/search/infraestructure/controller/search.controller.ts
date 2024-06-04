import { Controller, Get, ParseArrayPipe, ParseIntPipe, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infraestructure/guards/jwt-guard.guard';

@ApiTags('Search')
@ApiBearerAuth('token')
@ApiUnauthorizedResponse({description: 'Acceso no autorizado, no se pudo encontrar el Token'})
@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {

    @Get()
    search(
        @Request() req, 
        @Query('page', ParseIntPipe) page: number,
        @Query('perpage', ParseIntPipe) perpage: number,
        @Query('term') term?: string, 
        @Query('tag', new ParseArrayPipe({items: String, separator: ',', optional: true})) tag?: string[]
    ) {
        const data = {page, perpage, term, tag};
        
    }
}
