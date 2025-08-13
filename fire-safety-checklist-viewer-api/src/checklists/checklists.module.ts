import { Module } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { ChecklistsResolver } from './checklists.resolver';

@Module({
  controllers: [],
  providers: [ChecklistsService, ChecklistsResolver],
})
export class ChecklistsModule {}
