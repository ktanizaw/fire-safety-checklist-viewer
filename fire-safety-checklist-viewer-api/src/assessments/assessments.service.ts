import { Injectable, NotFoundException } from '@nestjs/common';
import { Assessment } from './assessments.entity';
import { mockAssessments } from '@/data/mockData';

@Injectable()
export class AssessmentsService {
  private calculatePendingActionCount(assessment: Assessment): number {
    return assessment.sections
      .flatMap((section) => section.items)
      .filter((item) => item.requiresAction && item.actionItem).length;
  }

  async getAllAssessments(): Promise<Assessment[]> {
    return mockAssessments.map((assessment) => ({
      ...assessment,
      pendingActionCount: this.calculatePendingActionCount(assessment),
    }));
  }

  async getAssessmentById(id: string): Promise<Assessment> {
    const assessment = mockAssessments.find(
      (assessment) => assessment.id === id,
    );
    if (!assessment) {
      throw new NotFoundException(`Assessment:${id} not found`);
    }
    return {
      ...assessment,
      pendingActionCount: this.calculatePendingActionCount(assessment),
    };
  }
}
