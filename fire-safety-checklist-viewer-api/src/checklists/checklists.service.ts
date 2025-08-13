import { Injectable, NotFoundException } from '@nestjs/common';
import { Checklist, ChecklistSummary } from '@/types';
import { mockChecklists } from '@/data/mock-checklists';

@Injectable()
export class ChecklistsService {
  async getAllChecklistSummaries(): Promise<ChecklistSummary[]> {
    return mockChecklists.map((checklist) => ({
      id: checklist.id,
      buildingName: checklist.buildingName,
      address: checklist.address,
      status: checklist.status,
      overallCompletionPercentage: checklist.overallCompletionPercentage,
      lastUpdated: checklist.lastUpdated,
      pendingActionCount: this.calculatePendingActionCount(checklist),
    }));
  }

  async getChecklistById(id: string): Promise<Checklist> {
    const checklist = mockChecklists.find((checklist) => checklist.id === id);
    if (!checklist) {
      throw new NotFoundException(`Checklist:${id} not found`);
    }
    return checklist;
  }

  private calculatePendingActionCount(checklist: Checklist): number {
    return checklist.sections
      .flatMap((section) => section.items)
      .filter((item) => item.requiresAction).length;
  }
}
