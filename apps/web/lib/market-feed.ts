export async function getExternalLivePriceFeed() {
  const baseUrl = process.env.INSFORGE_API_URL;
  const apiKey = process.env.INSFORGE_API_KEY;

  if (!baseUrl || !apiKey) {
    return null;
  }

  try {
    const response = await fetch(baseUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}
