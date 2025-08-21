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

    const postUser = document.createElement('h1');
    postUser.textContent = post.user;

    const postText = document.createElement('p');
    postText.textContent = post.content;

    const postDate = document.createElement('span');
    postDate.textContent = post.date;
    postDate.classList.add('postDate');

    const editBtn = document.createElement('button');
    editBtn.classList.add('editBtn');

    const editIcon = document.createElement('img');
    editIcon.src = 'icon/editIcon.svg';
    editIcon.alt = 'Editar';
    editIcon.classList.add('editIcon');

    editBtn.appendChild(editIcon); 


    // create an edit button
    editBtn.addEventListener("click", () => {
        const input = document.createElement('input');
        input.type = "text";
        input.classList.add('editInput');
        input.value = postText.textContent;

        postText.replaceWith(input); // troca <p> pelo input

        function salvar() {
            postText.textContent = input.value; // atualiza o texto
            post.content = input.value;         // atualiza no array
            input.replaceWith(postText);        // volta a ser <p>
        }

        input.addEventListener("blur", salvar);
        input.addEventListener("keydown", e => {
            if (e.key === "Enter") salvar();
        });

        input.focus(); // foco imediato no input
    });

    // create a delete button
    const deleteBtn = document.createElement('button');

    deleteBtn.classList.add('deleteBtn');

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'icon/deleteIcon.svg';
    deleteIcon.alt = 'delete';
   deleteIcon.classList.add('deleteIcon');

    deleteBtn.appendChild(deleteIcon);

    deleteBtn.addEventListener("click", () => {
        postContainer.remove();
        xinfeed.posts = xinfeed.posts.filter(t => !(t.user === post.user && t.date === post.date));
    });


    postContainer.append(postUser, postText, postDate, editBtn, deleteBtn);
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

// format the current date and time
function formatDate() {
    const agora = new Date();
    return `${agora.getDate().toString().padStart(2, '0')}/` +
        `${(agora.getMonth() + 1).toString().padStart(2, '0')}/` +
        `${agora.getFullYear()} ` +
        `${agora.getHours().toString().padStart(2, '0')}:` +
        `${agora.getMinutes().toString().padStart(2, '0')}`;
}


// add a new post to the xinfeed
function addPost(content) {
    if (!content) {
        alert("Digite um post antes de enviar!");
        return;
    }

    xinfeed.posts.push({
        user: 'Xinlana',
        content: content,
        date: formatDate()
    });

    togglePostForm(false);
    renderPosts();
}


// when loaded, render the posts
window.addEventListener('load', renderPosts);

// Event listener for the send post button
newPostButton.addEventListener('click', () => togglePostForm(true));

sendPostButton.addEventListener('click', () => addPost(newPostInput.value));

// Event listener for the Enter key in the new post input
newPostInput.addEventListener('keydown', e => {
    if (e.key === "Enter") addPost(newPostInput.value);
});

