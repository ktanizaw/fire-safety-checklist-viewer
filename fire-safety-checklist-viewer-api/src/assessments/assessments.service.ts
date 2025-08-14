import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Assessment,
  AssessmentSection,
  AssessmentFilter,
  AssessmentSort,
} from './assessments.entity';
import { SortOrder } from '@/enums/sort.enum';
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

  private sortAssessments(
    assessments: Assessment[],
    sort?: AssessmentSort,
  ): Assessment[] {
    if (!sort) {
      return assessments;
    }

    return [...assessments].sort((a, b) => {
      if (sort.overallCompletionPercentage) {
        const aValue = a.overallCompletionPercentage;
        const bValue = b.overallCompletionPercentage;

        if (sort.overallCompletionPercentage === SortOrder.ASC) {
          return aValue - bValue;
        } else if (sort.overallCompletionPercentage === SortOrder.DESC) {
          return bValue - aValue;
        }
      }

      return 0;
    });
  }

  async getAllAssessments(
    filter?: AssessmentFilter,
    sort?: AssessmentSort,
  ): Promise<Assessment[]> {
    const filteredAssessments = filter?.status
      ? mockAssessments.filter((a) => a.status === filter.status)
      : mockAssessments;

    const sortedAssessments = this.sortAssessments(filteredAssessments, sort);

    return sortedAssessments.map((assessment) => {
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
