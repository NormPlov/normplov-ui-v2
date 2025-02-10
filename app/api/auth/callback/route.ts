// import { serialize } from "cookie";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { code } = await req.json();
//     console.log("Callback API Request:", { code });

//     if (!code) {
//       return NextResponse.json({ message: "No code provided" }, { status: 400 });
//     }

//     const externalApiUrl = `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/auth/google`;
//     console.log("External API URL:", externalApiUrl);

//     // Send the code to the external API
//     const response = await fetch(externalApiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ code }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("External API Error:", errorData);
//       return NextResponse.json(
//         { message: errorData.detail || "Failed to authenticate" },
//         { status: response.status }
//       );
//     }

//     const responseData = await response.json();
//     console.log("External API Response Data:", responseData);

//     // Extract tokens and user information
//     const { payload } = responseData;
//     console.log("pal",responseData)
//     const { user } = payload || {};
//     const { access_token, refresh_token, token_type, ...userDetails } = user || {};

//     if (!access_token || !refresh_token) {
//       return NextResponse.json(
//         { message: "Invalid token response from the external API" },
//         { status: 500 }
//       );
//     }

//     console.log("Tokens and User Data:", { access_token, refresh_token, userDetails });

//     // Set the refresh token in an HTTP-only cookie
//     const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
//     const serializedCookie = serialize(cookieName, refresh_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       sameSite: "lax",
//     });

//     // Return access token and user details in the response
//     return NextResponse.json(
//       {
//         accessToken: access_token,
//         user: userDetails,
//         tokenType: token_type,
//         message: responseData.message || "Authentication successful",
//       },
//       {
//         status: 200,
//         headers: {
//           "Set-Cookie": serializedCookie,
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Callback API Error:", error);
//     return NextResponse.json(
//       { message: error instanceof Error ? error.message : "Unknown error occurred" },
//       { status: 500 }
//     );
//   }
// }

// import { serialize } from "cookie";
// import { NextResponse } from "next/server";
// // type UserResponse = {
// //   payload: UserPayload;
// //   message?: string;
// // };
// // type UserPayload = {
// //   uuid: string;
// //   username: string;
// //   avatar: string | null;
// //   address: string | null;
// //   bio: string | null;
// //   gender: string | null;
// //   email: string | null;
// //   date_of_birth: string | null;
// //   phone_number: string | null;
// // };

// export async function POST(req: Request) {
//   try {
//     const { code } = await req.json();
//     if (!code) {
//       console.error("No authorization code provided");
//       return NextResponse.json({ message: "No code provided" }, { status: 400 });
//     }
  
//     const externalApiUrl = `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/auth/google`;
//     const response = await fetch(externalApiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ code }),
//     });
  
//     console.log("Response from external API:", response);
  
//     if (!response.ok) {
//       const errorResponse = await response.json();
//       console.error("Error from external API:", errorResponse);
//       return NextResponse.json(
//         { message: errorResponse.message || "External API error" },
//         { status: response.status }
//       );
//     }
  
//     const data = await response.json();
//     console.log("Success response from external API:", data);
  
//     // Validate tokens
//     const { access_token, refresh_token } = data.payload;
//     if (!access_token || !refresh_token) {
//       console.error("Missing tokens in external API response");
//       return NextResponse.json({ message: "Invalid token response" }, { status: 500 });
//     }
  
//     // Set refresh token as a cookie
//     const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
//     const serializedCookie = serialize(cookieName, refresh_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       sameSite: "lax",
//     });
  
//     console.log("Tokens are valid. Setting cookies and responding to client...");
  
//     return NextResponse.json(
//       {
//         accessToken: access_token,
//         message: "Authentication successful",
//       },
//       {
//         headers: { "Set-Cookie": serializedCookie },
//       }
//     );
//   } catch (error) {
//     console.error("Unexpected error in auth callback:", error);
//     return NextResponse.json(
//       { message: "An error occurred while processing the request." },
//       { status: 500 }
//     );
//   }
  
// }


// import { serialize } from "cookie";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { code } = await req.json();
//     if (!code) {
//       console.error("No authorization code provided");
//       return NextResponse.json({ message: "No code provided" }, { status: 400 });
//     }

//     const externalApiUrl = `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/auth/google`;
//     const response = await fetch(externalApiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ code }),
//     });

//     if (!response.ok) {
//       const errorResponse = await response.json();
//       console.error("Error from external API:", errorResponse);
//       return NextResponse.json(
//         { message: errorResponse.message || "External API error" },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();
//     const { access_token, refresh_token } = data.payload;

//     if (!access_token || !refresh_token) {
//       console.error("Missing tokens in external API response");
//       return NextResponse.json({ message: "Invalid token response" }, { status: 500 });
//     }

//     // Set refresh token in HTTP-only cookie
//     const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "normplov-refresh-token";
//     const serializedCookie = serialize(cookieName, refresh_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       sameSite: "lax",
//     });

//     // Return access token and user data in the response
//     return NextResponse.json(
//       {
//         accessToken: access_token,
//         message: "Authentication successful",
//       },
//       {
//         headers: {
//           "Set-Cookie": serializedCookie,
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Unexpected error in auth callback:", error);
//     return NextResponse.json(
//       { message: "An error occurred while processing the request." },
//       { status: 500 }
//     );
//   }
// }


import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ message: "No authorization code provided" }, { status: 400 });
    }

    const externalApiUrl = `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/auth/google`;
    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    console.log("response: " + response)
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error from external API:", errorResponse);
      return NextResponse.json(
        { message: errorResponse.message  },
        { status: response.status }
      );
    }

    const { access_token, refresh_token } = (await response.json()).payload;

    if (!access_token || !refresh_token) {
      return NextResponse.json({ message: "Invalid token response" }, { status: 500 });
    }

    // Set refresh token as a cookie
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "normplov-refresh-token";
    const serializedCookie = serialize(cookieName, refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json(
      { accessToken: access_token },
      {
        headers: { "Set-Cookie": serializedCookie }, // Do not set Authorization header here
      }
    );
  } catch (error) {
    console.error("Unexpected error in auth callback:", error);
    return NextResponse.json(
      { message: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
