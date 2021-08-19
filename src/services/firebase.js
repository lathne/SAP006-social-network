const waitAuthState = () => new Promise((resolve) => firebase.auth().onAuthStateChanged(resolve));

const getUser = () => firebase.auth().currentUser;

const updateUser = async (name) => {
  const user = await getUser();
  user.updateProfile({
    displayName: name,
  });
};

const signInSignUpWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  await firebase.auth().signInWithPopup(provider);
};

const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

const signOut = () => firebase.auth().signOut();

const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

const signUp = async (name, email, password) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  await updateUser(name);
  await verificationEmail();
  await signOut();
};

const forgotYourPassword = (email) => firebase.auth().sendPasswordResetEmail(email);

// FEED

const loadPosts = () => {
  const postsCollection = firebase.firestore().collection('posts');
  return postsCollection.orderBy('data', 'desc').get();
};

const editPost = (newText, postID) => {
  firebase.firestore().collection('posts').doc(postID).update({ text: newText });
};

const deletePost = (postId) => {
  const postsCollection = firebase.firestore().collection('posts');
  postsCollection.doc(postId).delete().then(() => {
    console.log('Deleted!!!!!');
    loadPosts();
  });
};

const likePosts = (postId) => {
  const postsCollection = firebase.firestore().collection('posts');
  const promisseResult = postsCollection.doc(postId).get()
    .then(((post) => {
      console.log(postId);
      console.log(post.data());
      const countLikes = post.data().likes;
      if (countLikes >= 1) {
        postsCollection.doc(postId).update({
          likes: post.data().likes - 1,
        })
          .then(() => {
            loadPosts();
          });
      } else {
        postsCollection.doc(postId).update({
          likes: post.data().likes + 1,
        })
          .then(() => {
            loadPosts();
          });
      }
    }));
  return promisseResult.then();
};

const postData = () => {
  const data = new Date();
  return data.toLocaleString('pt-BR');
};

const createPost = (textPost) => {
  const user = firebase.auth().currentUser;
  const post = {
    text: textPost,
    userId: user.uid,
    userName: user.displayName,
    userEmail: user.email,
    likes: 0,
    comments: [],
    data: postData(),
  };

  const postsCollection = firebase
    .firestore()
    .collection('posts');
  return postsCollection.add(post);
};

export default {
  waitAuthState,
  getUser,
  updateUser,
  signInSignUpWithGoogle,
  signIn,
  signUp,
  signOut,
  forgotYourPassword,
  createPost,
  loadPosts,
  editPost,
  deletePost,
  likePosts,

};
