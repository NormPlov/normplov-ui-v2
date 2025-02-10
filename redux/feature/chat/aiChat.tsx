// import { normPlovApi } from "@/redux/api";

// type aiChatResponse = {
//   date: string;
//   status: number;
//   payload: coversation[];
//   message: string;
// };

// type coversation = {
//   uuid: string;
//   chat_title: string;
//   created_at: string;
//   updated_at: string;
// };

// type CreateChatResponse = {
//   date: string; 
//   status: number; 
//   payload: {
//     conversation_uuid: string; 
//     chat_title: string; 
//     conversation_history: {
//       user_query: string | null;
//       ai_reply: string; 
//       timestamp: string; 
//     }[];
//   };
//   message: string; 
// };



// export const chatApi = normPlovApi.injectEndpoints({
//   endpoints: (builder) => ({
//     fetchAllChat: builder.query<any, void>({
//       query: () => ({
//         url: "api/v1/ai/conversations",
//         method: "GET",
//       }),
//     }),
//     createChat: builder.mutation<CreateChatResponse, void>({
//       query: () => ({
//         url: `ai/conversations/start`,
//         method: "POST",
//       }),
//     }),

//   }),
// });

// export const { useFetchAllChatQuery, useCreateChatMutation } = chatApi;


import { normPlovApi } from "@/redux/api";

type AiChatResponse = {
  date: string;
  status: number;
  payload: Conversation[]; // The `payload` is an array of conversations
  message: string;
};

type Conversation = {
  uuid: string;
  chat_title: string;
  created_at: string;
  updated_at: string | null;
};

type CreateChatResponse = {
  date: string; 
  status: number; 
  payload: {
    conversation_uuid: string; 
    chat_title: string; 
    conversation_history: {
      user_query: string | null;
      ai_reply: string;
      timestamp: string; 
    }[]; 
  };
  message: string; 
};

type ConversationHistory = {
  user_query: string;
  ai_reply: string;
  timestamp: string;
};

type ConversationDetailsResponse = {
  date: string;
  status: number;
  payload: {
    conversation_uuid: string;
    chat_title: string;
    conversation_history: ConversationHistory[];
    updated_at: string;
  };
  message: string;
};


export const chatApi = normPlovApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch  all chat
    fetchAllChat: builder.query<AiChatResponse, void>({
      query: () => ({
        url: "api/v1/ai/conversations", 
        method: "GET",
      }),
      providesTags:["AllChats"]
    }),
    // create new chat
    // createChat: builder.mutation<CreateChatResponse, { user_query: string | null }>({
    //   query: ({user_query, }) => ({
    //     url: "api/v1/ai/conversations/start",
    //     method: "POST",
    //     body: {
    //       query
    //     }, 
    //   }),
    //   invalidatesTags:["AllChats"]
    // }),

    createChat: builder.mutation<CreateChatResponse, { user_query: string | null, user_test_uuid: string }>(
      {
        query: ({ user_query, user_test_uuid }) => ({
          url: "api/v1/ai/conversations/start",
          method: "POST",
          body: {
            query: user_query,
            user_test_uuid: user_test_uuid
          },
        }),
        invalidatesTags: ["AllChats"]
      }
    ),
    
    // Fetch chat by UUID
    fetchConversationDetails: builder.query<ConversationDetailsResponse, string>({
      query: (conversationUuid) => ({
        url: `api/v1/ai/conversations/${conversationUuid}`,
        method: "GET",
      }),
      providesTags: (result, error, conversationUuid) => [{ type: 'SingleChat', id: conversationUuid }],
    }),

    // Continue conversation
    continueConversation: builder.mutation<void, { uuid: string; new_query: string }>({
      query: ({ uuid, new_query }) => ({
        url: `api/v1/ai/conversations/${uuid}/continue`,
        method: "POST",
        body: { new_query },
      }),
      invalidatesTags: (result, error, { uuid }) => [{ type: 'SingleChat', id: uuid }],
    }),

    //Rename Chat
    RenameChat: builder.mutation<void, { uuid: string; new_title: string }>({
      query: ({ uuid, new_title }) => ({
        url: `api/v1/ai/conversations/${uuid}`,
        method: "PUT",
        body: { new_title },
      }),
      invalidatesTags:["AllChats"]
    }),

    // Delete Chat
    DeleteChat: builder.mutation<void, { uuid: string}>({
      query: ({ uuid }) => ({
        url: `api/v1/ai/conversations/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags:["AllChats"]
    }),
    
  }),
});

export const { useFetchAllChatQuery, useCreateChatMutation, useFetchConversationDetailsQuery, useContinueConversationMutation, useRenameChatMutation , useDeleteChatMutation} = chatApi;
