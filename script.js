const newPostButton = document.getElementById('newPostButton');
const newPostInput = document.getElementById('newPostInput');
const sendPostButton = document.getElementById('addNewPostButton');


// Function to toggle the visibility of the new post form
function togglePostForm(show) {
    newPostInput.hidden = !show;
    sendPostButton.hidden = !show;
    if (show) newPostInput.value = '';
}

// Event listener for the send post button
newPostButton.addEventListener('click', () => togglePostForm(true));
