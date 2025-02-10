// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { setAccessToken, setUser } from "@/redux/feature/auth/authSlice";

// const useGoogleCallback = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   useEffect(() => {
//     const handleGoogleCallback = async () => {
//       try {
//         const response = await fetch(
//           "https://normplov-api.shinoshike.studio/api/v1/auth/google/callback"
//         );
//         if (!response.ok) {
//           throw new Error("Google login failed");
//         }
//         const data = await response.json();

//         // Dispatch access token and user data
//         dispatch(setAccessToken(data.payload.access_token));
//         dispatch(
//           setUser({
//             uuid: data.payload.uuid,
//             username: data.payload.username,
//             email: data.payload.email,
//             roles: data.payload.roles,
//             avatar: data.payload.avatar,
//           })
//         );

//         // Redirect user to home
//         router.push("/");
//       } catch (error) {
//         console.error("Error during Google callback:", error);
//         router.push("/login"); // Redirect to login on failure
//       }
//     };

//     handleGoogleCallback();
//   }, [dispatch, router]);
// };

// export default useGoogleCallback;
