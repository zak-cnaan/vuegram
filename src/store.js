import Vue from "vue";
import Vuex from "vuex";
const fb = require("./firebaseConfig.js");

Vue.use(Vuex);

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("setCurrentUser", user);
    store.dispatch("fetchUserProfile");

    // realtime updates from our posts collection
    //   fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
    //     let postsArray = []

    //     querySnapshot.forEach(doc => {
    //         let post = doc.data()
    //         post.id = doc.id
    //         postsArray.push(post)
    //     })

    //     store.commit('setPosts', postsArray)
    // })
  }
});

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    posts: [],
    trees: [],
    strains: [],
    rooms: [],
    overlay: 0
  },
  actions: {
    clearData({ commit }) {
      commit("setCurrentUser", null);
      commit("setUserProfile", {});
    },
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("setUserProfile", res.data());
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchStrains() {
      store.commit("setLoadingCounter", "ADD");
      fb.strainsCollection.get().then(querySnapshot => {
        let strainsArray = [];

        querySnapshot.forEach(doc => {
          let post = doc.data();
          post.id = doc.id;
          strainsArray.push(post);
        });

        store.commit("setStrains", strainsArray);
        store.commit("setLoadingCounter", "remove");
      });
    },
    fetchRooms() {
      store.commit("setLoadingCounter", "ADD");
      fb.roomsCollection.get().then(querySnapshot => {
        let collectionArray = [];

        querySnapshot.forEach(doc => {
          let post = doc.data();
          post.id = doc.id;
          collectionArray.push(post);
        });

        store.commit("setRooms", collectionArray);
        store.commit("setLoadingCounter", "remove");
      });
    },
    fetchTrees() {
      store.commit("setLoadingCounter", "ADD");
      fb.treesCollection.get().then(querySnapshot => {
        let collectionArray = [];

        querySnapshot.forEach(doc => {
          let post = doc.data();
          post.id = doc.id;
          collectionArray.push(post);
        });

        store.commit("setTrees", collectionArray);
        store.commit("setLoadingCounter", "remove");
      });
    },
    fetchPosts() {
      fb.postsCollection
        .orderBy("createdOn", "desc")
        .get()
        .then(querySnapshot => {
          let postsArray = [];

          querySnapshot.forEach(doc => {
            let post = doc.data();
            post.id = doc.id;
            postsArray.push(post);
          });

          store.commit("setPosts", postsArray);
        });
    }
  },
  mutations: {
    setLoadingCounter(state, val) {
      if (val == "ADD") state.overlay = state.overlay + 1;
      else {
        state.overlay = state.overlay - 1;
      }
    },
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPosts(state, val) {
      state.posts = val;
    },
    setStrains(state, val) {
      state.strains = val;
    },
    setRooms(state, val) {
      state.rooms = val;
    },
    setTrees(state, val) {
      state.trees = val;
    }
  }
});
