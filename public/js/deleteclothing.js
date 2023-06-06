// Add event listener for delete buttons
const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const itemId = button.dataset.id;

    // Send a request to delete the item with the provided itemId
    fetch(`/api/clothing/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Item deleted successfully
          console.log('Clothing item deleted successfully!');
          // Perform any necessary UI updates
          button.parentElement.remove(); // Remove the item from the DOM
        } else {
          // Error occurred while deleting the item
          console.log('Error deleting clothing item.');
        }
      })
      .catch((error) => {
        // Error occurred while making the request
        console.log('Error deleting clothing item:', error);
      });
  });
});
