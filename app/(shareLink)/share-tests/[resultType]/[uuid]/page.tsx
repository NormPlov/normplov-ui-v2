import ResultShareDynamicComponent from '@/components/QuizComponent/QuizPageComponent/ResultShareDynamicComponent';
import React from 'react'
import { Metadata } from "next";

// export async function generateMetadata({ params }: { params: { uuid: string } }) {
//   const seoBaseUrl = "https://normplov-api.istad.co/api/v1/test/image";
//   let seoImageUrl = "/Quiz/stepup.png"; // Default image

//   try {
//     // ✅ First, generate the SEO image (if not already done)
//     const response = await fetch(`https://normplov-api.istad.co/api/v1/test/${params.uuid}/save-image`, {
//       method: "POST",
//     });
//     console.log("response 1: " + response)
//     if (response.ok) {
//       const data = await response.json();
//       console.log("data 2: " + data)
//       if (data.payload?.file_name) {
//         seoImageUrl = `${seoBaseUrl}/${data.payload.file_name}`;
//         console.log("Generated SEO image: " + seoImageUrl);
//       }
//     } else {
//       console.warn("Failed to generate SEO image, using default.");
//     }
//   } catch (error) {
//     console.error("Error fetching SEO image:", error);
//   }

//   return {
//     title: "Check out this result!",
//     description: "Your quiz result is here!",
//     openGraph: {
//       images: [
//         {
//           url: seoImageUrl, // ✅ Now dynamically fetched
//           width: 1200,
//           height: 630,
//           alt: "Quiz Result",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       images: [seoImageUrl], // ✅ Now dynamically fetched
//     },
//   };
// }
export async function generateMetadata({ params }: { params: { resultType: string; uuid: string } }): Promise<Metadata> {
  const seoBaseUrl = "https://normplov-api.istad.co/api/v1/test/image";
  let seoImageUrl = "/Quiz/stepup.png"; // Default image
  let shareableLink = `https://normplov.istad.co/share-tests/${params.resultType}/${params.uuid}`; // Default link

  try {
    // ✅ Fetch the shareable link (actual result page link)
    const linkResponse = await fetch(`https://normplov-api.istad.co/api/v1/test/generate-shareable-link/${params.uuid}`);
    if (linkResponse.ok) {
      const linkData = await linkResponse.json();
      if (linkData.payload?.shareable_link) {
        shareableLink = linkData.payload.shareable_link; // ✅ Get the actual result page link
      }
    }

    // ✅ Generate the SEO image
    const imageResponse = await fetch(`https://normplov-api.istad.co/api/v1/test/${params.uuid}/save-image`, { method: "POST" });
    console.log("image response: " + imageResponse)
    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      console.log("image data: " + imageData)
      if (imageData.payload?.file_name) {
        seoImageUrl = `${seoBaseUrl}/${imageData.payload.file_name}`;
        console.log("Generated SEO image: " + seoImageUrl);
      }
    }
  } catch (error) {
    console.error("Error fetching SEO image or shareable link:", error);
  }

  return {
    title: "Check out your result!",
    description: "Discover your personality test result.",
    openGraph: {
      title: "Your Test Result",
      description: "Find out your test results and insights.",
      type: "website",
      url: shareableLink, // ✅ This ensures clicking the image redirects to the test result
      images: [
        {
          url: seoImageUrl, // ✅ Only the image will be shown in Facebook/Telegram preview
          width: 1200,
          height: 630,
          alt: "Your Test Result",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Your Test Result",
      description: "Explore your personality insights.",
      images: [seoImageUrl],
    },
  };
}



export default function page() {

  return (
    <div className='bg-bgPrimaryLight'>
      <ResultShareDynamicComponent />
    </div>

  )
}