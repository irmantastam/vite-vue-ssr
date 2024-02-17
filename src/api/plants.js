export const GET = async (req, res) => {
  const query = `{ 
    plantCollection {
      items {
        sys {
          id
        }
        commonName
        scientificName
        image {
          url
          description
        }
        wateringSchedule
        lastWatered
        sunlight
        happiness
      }
    }
  }`

  const fetchPlants = async () => {
    try {
      return await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${
          import.meta.env.VITE_CONTENTFUL_SPACE_ID
        }`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        }
      ).then((response) => response.json())
    } catch (error) {
      throw new Error('Could not receive the data from Contentful!')
    }
  }

  const plants = await fetchPlants()

  await res.send(plants)
}
