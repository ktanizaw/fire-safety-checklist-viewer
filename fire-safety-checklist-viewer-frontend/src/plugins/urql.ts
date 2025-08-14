import { Client, fetchExchange } from '@urql/vue';

export default defineNuxtPlugin(
  ({
    $config: {
      public: { apiBase },
    },
  }) => {
    return {
      provide: {
        urql: {
          client: new Client({
            url: `${apiBase}/graphql`,
            exchanges: [fetchExchange],
            fetch,
            requestPolicy: 'network-only',
            fetchOptions: {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          }),
        },
      },
    };
  },
);
