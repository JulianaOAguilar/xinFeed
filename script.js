const newPostButton = document.getElementById('newPostButton');
const newPostInput = document.getElementById('newPostInput');
const sendPostButton = document.getElementById('addNewPostButton');
const timeline = document.getElementById('timeline');

// Sample data for the xinfeed
const xinfeed = {
    posts: [
        { user: 'Xinlana', content: 'Meu primeiro post :)', date: '21/08/2025 13:30' },
        { user: 'Xinlana', content: 'Meu segundo post :)', date: '21/08/2025 13:30' }
    ]
};

// create a post element
function createPostElement(post) {
    
    const postContainer = document.createElement('article');
    postContainer.style.position = 'relative';

    const postText = document.createElement('p');
    postText.textContent = post.content;

    postContainer.append(postText);
    return postContainer;
}


// render tweets in the timeline
function renderPosts() {
    timeline.innerHTML = '';
    xinfeed.posts.forEach(post => {
        timeline.appendChild(createPostElement(post));
    });
}


// toggle the visibility of the new post form
function togglePostForm(show) {
    newPostInput.hidden = !show;
    sendPostButton.hidden = !show;
    if (show) newPostInput.value = '';
}


function addPost(content) {
    if (!content) {
        alert("Digite um post antes de enviar!");
        return;
    }

    xinfeed.posts.push({
        content: content
    });

    togglePostForm(false);
    renderPosts();
}


// when loaded, render the posts
window.addEventListener('load', renderPosts);

// Event listener for the send post button
newPostButton.addEventListener('click', () => togglePostForm(true));

sendPostButton.addEventListener('click', () => addPost(newPostInput.value));


