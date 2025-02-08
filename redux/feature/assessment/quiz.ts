import { normPlovApi } from '@/redux/api'; // Import the main API instance

const assessmentApiMap: Record<string, string> = {
  skill: 'api/v1/assessment/predict-skills',
  personality: 'api/v1/assessment/personality-assessment',
  interest: 'api/v1/assessment/process-interest-assessment',
  value: 'api/v1/assessment/value-assessment',
  learningStyle: 'api/v1/assessment/predict-learning-style',
};


export const quizApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    predictAssessment: builder.mutation({
      query: ({ assessmentType, body }: { assessmentType: string; body: object }) => {
        const endpoint = assessmentApiMap[assessmentType];
        if (!endpoint) throw new Error(`Invalid assessment type: ${assessmentType}`);
        return {
          url: endpoint,
          method: 'POST',
          body,
        };
      },
    }),
    // fetch if there any draft for the main page test listing
    fetchAllTestEn: builder.query<any, void>({
      query: () => ({
        url: `api/v1/draft/latest-drafts?lang=en`,
        method: "GET",
      }),
      providesTags: ["AllTestAsess", "userDraft"]
    }),

    // fetch if there any draft for the main page test listing
    fetchAllTestKh: builder.query<any, void>({
      query: () => ({
        url: `api/v1/draft/latest-drafts?lang=km`,
        method: "GET",
      }),
      providesTags: ["AllTestAsess", "userDraft"]
    }),

    // for all test assessment
    LoadFiveTest: builder.query<any, string[]>({
      query: (testUuids) => {
        // Construct the URL with multiple test_uuids
        const testUuidParams = testUuids
          .map((uuid) => `test_uuids=${uuid}`)
          .join('&'); // Join them with '&' to create multiple query parameters
        return {
          url: `api/v1/assessment/get-aggregated-tests?${testUuidParams}`,
          method: 'GET',
        };
      },
    }),

    // for all test assessments
    // for all test career predictions
    LoadCareerPrediction: builder.mutation<any, { testUuids: string[], topN: number }>({
      query: ({ testUuids, topN }) => {
        // Construct the payload for the POST request
        return {
          url: `api/v1/assessment/predict-careers`,
          method: 'POST',
          body: {
            test_uuids: testUuids,
            top_n: topN,
          },
        };
      },
    }),

    getAllFinalTestUuids: builder.query<any, { testUuid: string }>({
      query: ({ testUuid }) => {
        // Construct the payload for the POST request
        return {
          url: `api/v1/assessment/final-test/${testUuid}`,
          method: 'GET',

        };
      },
    }),

    getCareerByUuid: builder.mutation<any, { uuid: string; career_uuid: string }>({
      query: ({ uuid, career_uuid }) => ({
        url: `api/v1/test/careers-data/${uuid}/${career_uuid}`,
        method: "GET",
      }),
    }),


  }),
});

export const { usePredictAssessmentMutation, useFetchAllTestEnQuery,useFetchAllTestKhQuery, useLoadFiveTestQuery, useLoadCareerPredictionMutation, useGetAllFinalTestUuidsQuery, useGetCareerByUuidMutation } = quizApi;
