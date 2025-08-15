<script lang="ts" setup>
import { graphql } from '@/gql';
import AssessmentInfo from '@/components/compounds/AssessmentInfo.vue';
import AssessmentSectionAccordion from '@/components/compounds/AssessmentSectionAccordion.vue';
import BasicButton from '@/components/atoms/BasicButton.vue';
import AssessmentQuestion from '@/components/compounds/AssessmentQuestion.vue';
import ModalBase from '~/components/atoms/modal/ModalBase.vue';
import ActionItemModalContent from '@/components/compounds/modal/ActionItemModalContent.vue';
import type { ActionItem } from '@/gql/graphql';
import LoadingSpinner from '@/components/atoms/LoadingSpinner.vue';

const assessmentDetailDocument = graphql(`
  query assessmentDetail($id: ID!) {
    assessmentById(id: $id) {
      id
      ...AssessmentInfo
      sections {
        id
        ...AssessmentSectionAccordion
        items {
          id
          ...AssessmentQuestion
          actionItem {
            id
            deficiency
            proposedAction
            timescale
            personResponsible
            priority
            status
          }
        }
      }
    }
  }
`);

const {
  $urql: { client },
} = useNuxtApp();

const {
  params: { assessmentId },
} = useRoute('assessments-assessmentId');

const { data, pending } = await useRequiredAsyncData(
  `assessment-detail-${assessmentId}`,
  async () => {
    const { data: queryData, error } = await client.query(
      assessmentDetailDocument,
      {
        id: assessmentId,
      },
    );

    if (error || !queryData) {
      throw new Error(error?.message || 'Failed to fetch assessmentDetail');
    }
    return queryData;
  },
);

const isActionItemModalOpen = ref(false);
const selectedActionItem = ref<ActionItem | null>(null);

const openActionItemModal = (actionItem?: ActionItem | null) => {
  if (actionItem) {
    selectedActionItem.value = actionItem;
    isActionItemModalOpen.value = true;
  }
};

const closeActionItemModal = () => {
  isActionItemModalOpen.value = false;
  selectedActionItem.value = null;
};
</script>

<template>
  <div class="page">
    <div class="page__container">
      <NuxtLink to="/assessments">
        <BasicButton text="Back" />
      </NuxtLink>
      <div v-if="!pending" class="page__content">
        <AssessmentInfo :masked-assessment="data.assessmentById" />
        <div class="page__sections">
          <AssessmentSectionAccordion
            v-for="section in data.assessmentById.sections"
            :key="section.id"
            :masked-assessment-section-accordion="section"
          >
            <div class="page__questions">
              <AssessmentQuestion
                v-for="(item, index) in section.items"
                :key="item.id"
                :masked-assessment-question="item"
                :index="index"
                @open-action-item-modal="openActionItemModal(item.actionItem)"
              />
            </div>
          </AssessmentSectionAccordion>
        </div>
      </div>
      <div v-else class="page__loading">
        <LoadingSpinner />
      </div>
    </div>
    <Teleport to="body">
      <ModalBase v-if="isActionItemModalOpen && selectedActionItem">
        <ActionItemModalContent
          :action-item="selectedActionItem"
          @close="closeActionItemModal"
        />
      </ModalBase>
    </Teleport>
  </div>
</template>
<style lang="scss" scoped>
.page {
  padding: 20px;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 960px;
    margin: 0 auto;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__sections {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__questions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50dvh;
  }
}
</style>
