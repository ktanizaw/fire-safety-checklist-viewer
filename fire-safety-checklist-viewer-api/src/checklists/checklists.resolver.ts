import { Resolver, Query, Args } from '@nestjs/graphql';
import { ChecklistsService } from './checklists.service';
import { Checklist } from './checklists.entity';

@Resolver()
export class ChecklistsResolver {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Query(() => [Checklist])
  async checklists(): Promise<Checklist[]> {
    return this.checklistsService.getAllChecklists();
  }

  @Query(() => Checklist)
  async checklistById(@Args('id') id: string): Promise<Checklist> {
    return this.checklistsService.getChecklistById(id);
  }
}
