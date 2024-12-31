
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log("Middleware triggered:", request.url);

    const refreshToken = request.cookies.get("normplov-refresh-token");

    if (!refreshToken) {
        console.log("No refresh token found, redirecting to login...");
        return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("Refresh token found, allowing request...");

    return NextResponse.next();
}

// Apply the middleware to /test and all its subroutes
export const config = {
    matcher: ["/test/personality","/test/skill","/test/learningStyle","/test/value","/test/interest","/test-result/:path*","/profile-about-user","/profile-quiz-history","/profile-draft","/chat-with-ai"] 
};
