const updateLastWornForm = document.querySelector('#update-last-worn');

updateLastWornForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const outfitItems = document.querySelectorAll('input[name="outfitItems"]:checked');
  const clothingIds = Array.from(outfitItems).map((item) => parseInt(item.value));

  const response = await fetch('/api/clothing/update-last-worn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: clothingIds }),
  });

  if (response.ok) {
    const updatedClothingItems = await response.json();
    console.log(updatedClothingItems);
    // Update UI to reflect updated items
  } else {
    const errorResponse = await response.json();
    console.log(errorResponse.message);
    // Display error message to user
  }
});


