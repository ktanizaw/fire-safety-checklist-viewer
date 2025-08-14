import { Injectable, NotFoundException } from '@nestjs/common';
import { Assessment, AssessmentSection } from './assessments.entity';
import { mockAssessments } from '@/data/mockData';

@Injectable()
export class AssessmentsService {
  private calculateSectionPendingActionCount(
    section: AssessmentSection,
  ): number {
    return section.items.filter(
      (item) => item.requiresAction && item.actionItem,
    ).length;
  }

  private calculatePendingActionCount(assessment: Assessment): number {
    return assessment.sections
      .flatMap((section) => section.items)
      .filter((item) => item.requiresAction && item.actionItem).length;
  }

  async getAllAssessments(): Promise<Assessment[]> {
    return mockAssessments.map((assessment) => {
      const sectionsWithCounts = assessment.sections.map((section) => ({
        ...section,
        pendingActionCount: this.calculateSectionPendingActionCount(section),
      }));

      const enrichedAssessment: Assessment = {
        ...assessment,
        sections: sectionsWithCounts,
      };

      return {
        ...enrichedAssessment,
        pendingActionCount:
          this.calculatePendingActionCount(enrichedAssessment),
      };
    });
  }

  async getAssessmentById(id: string): Promise<Assessment> {
    const assessment = mockAssessments.find(
      (assessment) => assessment.id === id,
    );
    if (!assessment) {
      throw new NotFoundException(`Assessment:${id} not found`);
    }
    const sectionsWithCounts = assessment.sections.map((section) => ({
      ...section,
      pendingActionCount: this.calculateSectionPendingActionCount(section),
    }));

    const enrichedAssessment: Assessment = {
      ...assessment,
      sections: sectionsWithCounts,
    };

    return {
      ...enrichedAssessment,
      pendingActionCount: this.calculatePendingActionCount(enrichedAssessment),
    };
  }
}
