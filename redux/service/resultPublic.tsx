import { normPlovApi } from '@/redux/api'; // Import the main API instance
// Define the general structure of an assessment result.
interface AssessmentResult {
  assessmentType: string;
  testUUID: string;
  testName: string;
  createdAt: string;
}

// Define specific types for each result type.
interface LearningStyleResult extends AssessmentResult {
  learningStyle: string;
  chart: { labels: string[]; values: number[] };
  dimensions: { dimension_name: string; dimension_description: string; level: number }[];
  recommendedTechniques: { technique_name: string; description: string; image_url?: string }[];
  relatedCareers: { career_name: string; description: string; majors: string[] }[];
}

interface ValueResult extends AssessmentResult {
  chartData: { label: string; score: number }[];
  valueDetails: { name: string; definition: string; characteristics: string; percentage: string }[];
  key_improvements:{category:string;improvements:string[]}[];
  careerRecommendations: { career_name: string; description: string; majors: string[] }[];
}

interface InterestResult extends AssessmentResult {
  hollandCode: string;
  typeName: string;
  description: string;
  keyTraits: string[];
  careerPath: string[];
  chartData: { label: string; score: number }[];
  dimensionDescriptions: { dimension_name: string; description: string }[];
}

interface SkillResult  {
  assessmentType: string;
  testUUID: string;
  testName: string;
  createdAt: string;
  categoryPercentages: { [key: string]: number };
  skillsGrouped: { [key: string]: { skill: string; description: string }[] };
  strongCareers: { career_name: string; description: string; majors: string[] }[];
}

interface PersonalityResult extends AssessmentResult {
  personalityType: { name: string; title: string; description: string };
  dimensions: { dimension_name: string; score: number }[];
  traits: { positive: string[]; negative: string[] };
  strengths: string[];
  weaknesses: string[];
  careerRecommendations: { career_name: string; description: string; majors: string[] }[];
}
// Define the type for each test item
type Tests ={
    test_uuid: string;
    test_name: string;
    assessment_type_name:string;
    created_at: string;
  }
  
  // Define the type for pagination metadata
type Metadata ={
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  }
  

export const resultPublicApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAssessmentDetails: builder.query({
      // Accept both uuid and resultType in the query
      query: ({ testUUID, resultType }: { testUUID: string; resultType: string }) => ({
        url: `api/v1/test/public/${testUUID}`, // Dynamic query parameter
        method: 'GET',
      }),
      
      transformResponse: (response: any, meta, arg) => {
        const responseData = response?.payload[0];
       
        const resultType = arg.resultType
        console.log("data from api: ", responseData);

        if (!responseData) {
          console.error("No response data found");
          return [];  
        }

        console.log("result typee: ", arg.resultType)

        const parsedData = JSON.parse(responseData.user_response_data);

        console.log("parsed json: ", parsedData)
       
        // Process data based on the provided resultType
        switch (resultType) {
          case "learningStyle":
            return [{
              assessmentType: resultType,
              testUUID: parsedData.test_uuid,
              testName: resultType,
              createdAt: responseData.created_at,
              learningStyle: parsedData.learning_style || 'Unknown',
              chart: parsedData.chart || { labels: [], values: [] },
              dimensions: parsedData.dimensions || [],
              recommendedTechniques: parsedData.recommended_techniques || [],
              relatedCareers: parsedData.related_careers || []
            }] as any; 
        
          case "value":
            return [{
              assessmentType: resultType,
              testUUID: parsedData.test_uuid,
              testName: resultType,
              createdAt: responseData.created_at,
              chartData: parsedData.chart_data || [],
              valueDetails: parsedData.value_details || [],
              key_improvements: parsedData.key_improvements || [],
              careerRecommendations: parsedData.career_recommendations || []
            }];
        
          case "interest":
            return [{
              assessmentType: resultType,
              testUUID: parsedData.test_uuid,
              testName: resultType,
              createdAt: responseData.created_at,
              hollandCode: parsedData.holland_code || '',
              typeName: parsedData.type_name || '',
              description: parsedData.description || '',
              keyTraits: parsedData.key_traits || [],
              careerPath: parsedData.career_path || [],
              chartData: parsedData.chart_data || [],
              dimensionDescriptions: parsedData.dimension_descriptions || []
            }];
        
          case "skill":
            return [{
              topCategory: parsedData.top_category || {},
              assessmentType: resultType,
              testUUID: parsedData.test_uuid,
              testName: resultType,
              createdAt: responseData.created_at,
              categoryPercentages: parsedData.category_percentages || {},
              skillsGrouped: parsedData.skills_grouped || {},
              strongCareers: parsedData.strong_careers || []
            }] as any;
        
          case "personality":
            return [{
              assessmentType: resultType,
              testUUID: parsedData.test_uuid,
              testName: resultType,
              createdAt: responseData.created_at,
              personalityType: parsedData.personality_type || {},
              dimensions: parsedData.dimensions || [],
              traits: parsedData.traits || {},
              strengths: parsedData.strengths || [],
              weaknesses: parsedData.weaknesses || [],
              careerRecommendations: parsedData.career_recommendations || []
            }];
        
          default:
            console.error("Unknown result type:", resultType);
            return [];  // Return an empty array for unknown tests
        }
      }
    }),

  }),
});

export const { useFetchAssessmentDetailsQuery } = resultPublicApi;