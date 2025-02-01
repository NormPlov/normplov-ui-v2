export async function getUniversityById(id: string ) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}/api/v1/schools/${id}`);
      
      if (!response.ok) return null;
  
      const data = await response.json();
      return data.payload; // Ensure this returns the university object
    } catch (error) {
      console.error("Error fetching university:", error);
      return null;
    }
  }
  