import { Injectable, NotFoundException } from '@nestjs/common';
import { Checklist } from './checklists.entity';
import { mockChecklists } from '@/data/mock-checklists';

@Injectable()
export class ChecklistsService {
  private calculatePendingActionCount(checklist: Checklist): number {
    return checklist.sections
      .flatMap((section) => section.items)
      .filter((item) => item.requiresAction && item.actionItem).length;
  }

  async getAllChecklists(): Promise<Checklist[]> {
    return mockChecklists.map((checklist) => ({
      ...checklist,
      pendingActionCount: this.calculatePendingActionCount(checklist),
    }));
  }

  async getChecklistById(id: string): Promise<Checklist> {
    const checklist = mockChecklists.find((checklist) => checklist.id === id);
    if (!checklist) {
      throw new NotFoundException(`Checklist:${id} not found`);
    }
    return {
      ...checklist,
      pendingActionCount: this.calculatePendingActionCount(checklist),
    };
  }
}
