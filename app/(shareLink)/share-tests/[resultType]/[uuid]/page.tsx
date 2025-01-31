import type { Metadata } from "next"
import ResultShareDynamicComponent from "@/components/QuizComponent/QuizPageComponent/ResultShareDynamicComponent"

const API_BASE_URL = "https://normplov-api.istad.co/api/v1"
const DEFAULT_IMAGE = "/Quiz/stepup.png"

async function fetchShareableLink(uuid: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/test/generate-shareable-link/${uuid}`)
  if (!response.ok) throw new Error("Failed to fetch shareable link")
  const data = await response.json()
  return data.payload?.shareable_link || ""
}

async function generateSeoImage(uuid: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/test/${uuid}/save-image`, { method: "POST" })
  if (!response.ok) throw new Error("Failed to generate SEO image")
  const data = await response.json()
  return data.payload?.file_name ? `${API_BASE_URL}/test/image/${data.payload.file_name}` : DEFAULT_IMAGE
}

export async function generateMetadata({
  params,
}: { params: { resultType: string; uuid: string } }): Promise<Metadata> {
  const { resultType, uuid } = params
  const title = "Discover Your Personality Test Result!"
  const description = "Uncover fascinating insights about yourself with our in-depth personality analysis."

  try {
    const [shareableLink, seoImageUrl] = await Promise.all([fetchShareableLink(uuid), generateSeoImage(uuid)])

    const metadata: Metadata = {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: shareableLink || `https://normplov.istad.co/share-tests/${resultType}/${uuid}`,
        images: [
          {
            url: seoImageUrl,
            width: 1200,
            height: 630,
            alt: "Your Unique Personality Test Result",
          },
        ],
        siteName: "NormPlov Personality Insights",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [seoImageUrl],
      },
    }

    return metadata
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title,
      description,
    }
  }
}

export default function Page() {
  return (
    <div className="bg-bgPrimaryLight min-h-screen">
      <ResultShareDynamicComponent />
    </div>
  )
}

