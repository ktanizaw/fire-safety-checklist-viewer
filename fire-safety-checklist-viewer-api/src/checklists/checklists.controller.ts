import { Controller, Get, Param } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { Checklist, ChecklistSummary } from '@/types';

@Controller('checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Get()
  async getAllChecklistSummaries(): Promise<ChecklistSummary[]> {
    return this.checklistsService.getAllChecklistSummaries();
  }

  @Get(':id')
  async getChecklistById(@Param('id') id: string): Promise<Checklist> {
    return this.checklistsService.getChecklistById(id);
  }
}
