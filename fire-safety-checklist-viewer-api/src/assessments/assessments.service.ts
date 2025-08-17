import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  Assessment,
  AssessmentSection,
  AssessmentFilter,
  AssessmentSort,
  AssessmentStatus,
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

  getAllAssessments(
    filter?: AssessmentFilter,
    sort?: AssessmentSort,
  ): Assessment[] {
    try {
      if (
        filter?.status &&
        !Object.values(AssessmentStatus).includes(
          filter.status as AssessmentStatus,
        )
      ) {
        throw new BadRequestException(`Invalid status: ${filter.status}`);
      }

      const filteredAssessments = mockAssessments
        .filter((assessment) => {
          if (filter?.status) {
            return assessment.status === filter.status;
          }
          return true;
        })
        .filter((assessment) => {
          if (filter?.searchQuery) {
            const searchQuery = filter.searchQuery.toLowerCase().trim();
            const buildingName = assessment.buildingName.toLowerCase();
            const address = assessment.address.toLowerCase();

            return (
              buildingName.includes(searchQuery) ||
              address.includes(searchQuery)
            );
          }
          return true;
        });

      const sortedAssessments = this.sortAssessments(filteredAssessments, sort);

      const enrichedAssessments = sortedAssessments.map((assessment) => {
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

      return enrichedAssessments;
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        throw new InternalServerErrorException('Failed to fetch assessments');
      }
      throw error;
    }
  }

  getAssessmentById(id: string): Assessment {
    try {
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

      const result = {
        ...enrichedAssessment,
        pendingActionCount:
          this.calculatePendingActionCount(enrichedAssessment),
      };

      return result;
    } catch (error) {
      if (
        !(
          error instanceof NotFoundException ||
          error instanceof BadRequestException
        )
      ) {
        throw new InternalServerErrorException('Failed to fetch assessment');
      }
      throw error;
    }
  }
}
