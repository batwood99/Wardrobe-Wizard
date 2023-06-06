// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  // Get the button element
  var addButton = document.querySelector('.btn.btn-primary');

  // Add a click event listener to the button
  addButton.addEventListener('click', function () {
    // Get the modal element
    var modal = document.getElementById('addClothingModal');

    // Show the modal
    modal.style.display = 'block';
  });

  // Get the close button element
  var closeButton = document.querySelector('.close');

  // Add a click event listener to the close button
  closeButton.addEventListener('click', function () {
    // Get the modal element
    var modal = document.getElementById('addClothingModal');

    // Hide the modal
    modal.style.display = 'none';
  });

  // Get the form element
  var form = document.getElementById('addClothingForm');

  // Add a submit event listener to the form
  form.addEventListener('submit', function (event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Get the selected clothing type
    var typeSelect = document.getElementById('type');
    var selectedType = typeSelect.options[typeSelect.selectedIndex].value;

    // Get the selected clothing color
    var colorInput = document.getElementById('color');
    var selectedColor = colorInput.value;

    // Get the clothing description
    var descriptionInput = document.getElementById('description');
    var description = descriptionInput.value;

    // Create an object with the user input data
    var clothingData = {
      type: selectedType,
      color: selectedColor,
      description: description,
    };

    // Send the data to the server
    fetch('/api/clothing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clothingData),
    })
      .then(function (response) {
        if (response.ok) {
          // Data was successfully saved, do something
          console.log('Clothing item added successfully!');
        } else {
          // An error occurred, handle the error
          console.log('Error adding clothing item.');
        }
      })
      .catch(function (error) {
        // An error occurred, handle the error
        console.log('Error adding clothing item:', error);
      });

    // Hide the modal
    var modal = document.getElementById('addClothingModal');
    modal.style.display = 'none';

    // Reset the form values
    typeSelect.selectedIndex = 0;
    colorInput.value = '';
    descriptionInput.value = '';
  });
});
