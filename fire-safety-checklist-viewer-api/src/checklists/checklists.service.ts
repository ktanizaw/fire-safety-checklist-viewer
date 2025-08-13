import { Injectable, NotFoundException } from '@nestjs/common';
import { Checklist } from './checklists.entity';
import { mockChecklists } from '@/data/mock-checklists';

@Injectable()
export class ChecklistsService {
  async getAllChecklists(): Promise<Checklist[]> {
    return mockChecklists;
  }

  async getChecklistById(id: string): Promise<Checklist> {
    const checklist = mockChecklists.find((checklist) => checklist.id === id);
    if (!checklist) {
      throw new NotFoundException(`Checklist:${id} not found`);
    }
    return checklist;
  }
}
