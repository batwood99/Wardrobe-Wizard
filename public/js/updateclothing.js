const updateLastWornForm = document.querySelector('#update-last-worn');

updateLastWornForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const outfitItems = document.querySelectorAll('input[name="outfitItems"]:checked');
  const clothingIds = Array.from(outfitItems).map((item) => parseInt(item.value));

  try {
    const response = await axios.post('/api/clothing/update-last-worn', { ids: clothingIds });

    if (response.status === 200) {
      const updatedClothingItems = response.data;
      console.log(updatedClothingItems);
      // Update UI to reflect updated items
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      // Display error message to user
    } else {
      console.log('Something went wrong:', error.message);
    }
  }
});
