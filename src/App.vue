<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item
          :to="item.link"
          link
          v-for="item in menuItems"
          :key="item.title"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="primary" dark app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: null,
    menuItems: [
      { icon: "mdi-home", title: "Home", link: "/" },
      { icon: "mdi-contact-mail", title: "Dashboard", link: "/dashboard" },
      { icon: "mdi-contact-mail", title: "Settings", link: "/settings" },
      { icon: "mdi-contact-mail", title: "Login", link: "/login" },
      { icon: "mdi-contact-mail", title: "Plants", link: "/plants" },
      {
        icon: "mdi-contact-mail",
        title: "Add Edit Plant",
        link: "/addEditPlant"
      }
    ]
  })
};
</script>
