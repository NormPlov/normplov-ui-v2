import { serialize } from "cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get the email and password
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 401 }
      );
    }

    console.log("Email: ", email);
    console.log("Password: ", password);

    // Make a POST request to the API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    if(response.status === 401){
      return NextResponse.json(
        {
          message: "Invalid email or password",
          error: "Email or password is incorrect",
        },
        {
          status: response.status,
        }
      )
    }
    // If the request fails, return an error message
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error:", errorResponse);
      return NextResponse.json(
        {
          message: "Failed to login",
          error: errorResponse.message || "An unknown error occurred",
        },
        {
          status: response.status,
        }
      );
    }

    // Parse the successful response
    const data = await response.json();
    console.log("data:", data);
    const { access_token, refresh_token, ...user } = data.payload;
    console.log("Access token login api: " + access_token)

    if (!access_token || !refresh_token) {
      return NextResponse.json(
        { message: "Invalid response from the server" },
        { status: 500 }
      );
    }

    console.log("Login successful. User:", user);

    // Serialize the refresh token with appropriate options
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
    const serialized = serialize(cookieName, refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax"
    });

    // Send the access token and user data in the response, with the refresh token as a cookie
    return NextResponse.json(
      {
        accessToken: access_token,
        user,
        message: data.message,
      },
      {
        status: response.status,
        headers: {
          "Set-Cookie": serialized,
        },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing the login request" },
      { status: 500 }
    );
  }
}
