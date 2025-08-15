import type { AsyncDataOptions, NuxtApp } from 'nuxt/app';

export const useRequiredAsyncData = async <T>(
  key: string,
  handler: (_ctx?: NuxtApp) => Promise<T>,
  options?: AsyncDataOptions<T>,
) => {
  const { data, error, ...res } = await useAsyncData<T>(key, handler, options);

  if (error.value) {
    const statusCode = isNuxtError(error.value) ? error.value.statusCode : 500;
    const message = error.value.message || 'server error';

    throw createError({
      statusCode,
      message,
      fatal: true,
    });
  }

  const readData = computed(() => {
    if (!data.value) {
      throw new Error('data is not fetched');
    }
    return data.value;
  });

  return {
    data: readData,
    error,
    ...res,
  };
};
