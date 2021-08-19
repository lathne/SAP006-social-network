const createPostElement = (post) => {
  const postElement = document.createElement('li');
  postElement.id = `post-${post.id}`;
  postElement.className = 'post-container';

  const contentPostElement = `
  <div class="user-info-container">
  <!-- <img src="https://i.pravatar.cc/100?img=48" alt="User Photo" class="user-post-photo"> -->
  <p class="user-name">@${post.data().userName}</p>
  <p class="post-date" id="">${post.data().data}</p>
</div>

<div class="post-field">
  <p class="user-post">${post.id} ${post.data().text}</p>

  <div data-editcontainer class="edit-container display-none">
    <textarea data-text="${post.id}" class="edit-post-textarea" rows="3" cols="30">${post.data().text}</textarea>

    <div class="edit-buttons">
      <button data-cancel="${post.id}" class="manage-edit-btn cancel-btn">Cancelar</button>
      <button data-save="${post.id}" class="manage-edit-btn save-btn">Salvar</button>
    </div>
  </div>
</div>

<div class="manage-post" id=${post.id}>
  <div class="post-likes" id="${post.id}">
    <button id="like-btn" class="manage-post-btn like-btn"><i class="fas fa-heart" id="heart"></i></button>
    <p class="likes-number" id="${post.id}">${post.data().likes}</p>
  </div>
  <button class="manage-post-btn edit-btn"><i data-edit="${post.id}" class="fas fa-pencil-alt"></i></button>
  <button class="manage-post-btn delete-btn"><i class="fas fa-trash-alt"></i></button>
</div>
    `;

  postElement.innerHTML = contentPostElement;

  // registerListener

  return postElement;
};

export default createPostElement;
