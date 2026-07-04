import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Search products' })
  search(@Query('q') query: string, @Query('page') page?: string, @Query('limit') limit?: string) {
    return this.searchService.search(query, parseInt(page || '1'), parseInt(limit || '20'));
  }

  @Get('suggestions')
  @ApiOperation({ summary: 'Get search suggestions' })
  suggestions(@Query('q') query: string) {
    return this.searchService.suggestions(query);
  }
}
