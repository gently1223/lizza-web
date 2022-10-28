<template>
  <div class="menu-icon">
    <a href="javascript:" @click="isOpened = !isOpened">
      <img src="sidebar/menu.svg" />
    </a>
  </div>
  <div class="sidebar-main" :class="isOpened ? 'open' : ''">
    <div class="sidebar">
      <div class="close-icon">
        <a href="javascript:" @click="isOpened = !isOpened">
          <img src="sidebar/close.svg" />
        </a>
      </div>
      <div class="my-scroll">
        <ul class="nav-list">
          <span v-for="(menuItem, index) in menuItems" :key="index">
            <li>
              <a :href="menuItem.link">
                <img class="menu_icon" :src="menuItem.icon" />
                <span class="links_name">{{ menuItem.name }}</span>
              </a>
            </li>
            <li v-if="index == 4 || index == 6" class="divider"></li>
          </span>
           <span >
            <li>
               <a  @click="logout" style="cursor: pointer;">
                <img class="menu_icon" src='sidebar/logout.svg' />
                <span class="links_name"> Cerrar sesión </span>
                </a>
            </li>
          </span>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthApi } from 'src/factories/useAuthApi';
import { defineComponent } from 'vue';
import { useUserApi } from 'src/factories/useUserApi';

const { user } = useUserApi();

export default defineComponent({
  name: 'SidebarMenu',
  props: {
    //! Menu settings
    isMenuOpen: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String
    },
    //! Menu items
    menuItems: {
      type: Array,
      default: () => [
        {
          link: '/dashboard',
          name: 'Mi espacio',
          icon: 'sidebar/house.svg',
        },
        {
          link: '/',
          name: 'Mis productos',
          icon: 'sidebar/shop-alt.svg',
        },
        {
          link: '/payments',
          name: 'Mis ventas',
          icon: 'sidebar/dollar.svg',
        },
         {
          link: '/settings',
          name: 'Mi cuenta',
          icon: 'sidebar/user-circle.svg',
        },
        // {
        //   link: '/event',
        //   name: 'Event',
        //   icon: 'sidebar/refresh.svg',
        // },
        // {

        //   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        //   link: `https://web.lizzapp.com/${user.value?.username}`,
        //   name: 'Usar como comprador',
        //   icon: 'sidebar/refresh.svg',
        // },
        {
          link: 'https://lizzapp.com/index.php/condiciones-de-uso/',
          name: 'Términos y Condiciones',
          icon: 'sidebar/list.svg',
        },
        {
          link: 'https://lizzapp.com/index.php/politica-de-privacidad/',
          name: 'Política de Privacidad',
          icon: 'sidebar/lock.svg',
        },

      ],
    },

    //! Search
    isSearch: {
      type: Boolean,
      default: true,
    },
    searchPlaceholder: {
      type: String,
      default: 'Search...',
    },
    searchTooltip: {
      type: String,
      default: 'Search',
    },
    //! Profile detailes
    profileName: {
      type: String,
      default: 'Fayzullo Saidakbarov',
    },
    profileRole: {
      type: String,
      default: 'Frontend vue developer',
    },
    isExitButton: {
      type: Boolean,
      default: true,
    },
    //! Styles
    bgColor: {
      type: String,
      default: '#11101d',
    },
    secondaryColor: {
      type: String,
      default: '#1d1b31',
    },
    homeSectionColor: {
      type: String,
      default: '#e4e9f7',
    },
    logoTitleColor: {
      type: String,
      default: '#fff',
    },
    iconsColor: {
      type: String,
      default: '#fff',
    },
    itemsTooltipColor: {
      type: String,
      default: '#e4e9f7',
    },
    searchInputTextColor: {
      type: String,
      default: '#fff',
    },
    menuItemsHoverColor: {
      type: String,
      default: '#fff',
    },
    menuItemsTextColor: {
      type: String,
      default: '#fff',
    },
    menuFooterTextColor: {
      type: String,
      default: '#fff',
    },
  },
   setup(props) {
    const { logout } = useAuthApi();
    return {
      logout,
      props,
      };
  },

  data() {
    return {
      isOpened: false,
    }
  },
}
);
</script>

<style>
.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 320px;
  background: #ffffff;
  z-index: 99;
  transition: all 0.5s ease;
  height: 100vh;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  padding: 30px;
}
.sidebar-main {
  background-color: rgba(0, 0, 0, 0.15);
  width: 100%;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  transform: scale(0);
}
.sidebar-main.open {
  transform: scale(1);
}
.menu-icon {
  position: absolute;
  top: 35px;
  right: 60px;
}
.menu-icon img {
  filter: invert(23%) sepia(7%) saturate(12%) hue-rotate(354deg) brightness(92%) contrast(84%);
  transition: all 0.4s ease;
}
.menu-icon img:hover {
  filter: invert(41%) sepia(53%) saturate(2676%) hue-rotate(343deg) brightness(97%) contrast(86%);
}
.sidebar .nav-list {
  margin: 0;
  padding: 30px 0 0 0;
}
.sidebar .nav-list span+span li {
  margin-top: 30px;
  display: block;
}
.sidebar li {
  position: relative;
  list-style: none;
}
.sidebar li.divider {
  border-top: 1px solid #DDDDDD;
}
.sidebar li a {
  display: flex;
  width: 100%;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
}
.sidebar li a img {
  filter: invert(11%) sepia(10%) saturate(6667%) hue-rotate(171deg) brightness(96%) contrast(105%);
  transition: all 0.4s ease;
  width: 24px;
  height: 24px;
}
.sidebar li a span {
  transition: all 0.4s ease;
  color: #001E32;
  padding-left: 15px;
  font-size: 16px;
  font-weight: 500;
}
.sidebar li a:hover img {
  filter: invert(50%) sepia(12%) saturate(4013%) hue-rotate(329deg) brightness(90%) contrast(101%);
}
.sidebar li a:hover span {
  color: var(--q-primary);
}
.sidebar-main .sidebar .my-scroll {
  height: 100vh;
  overflow-y: auto;
}
@media (max-width: 991px) {
  .menu-icon img {
    width: 26px;
  }
  .menu-icon {
    top: 30px;
    right: 30px;
  }
}
@media (min-width: 641px) {
  .sidebar {
    right: -320px;
    top: 0;
  }
  .sidebar-main.open .sidebar {
    right: 0;
  }
  .close-icon a {
    height: 36px;
    width: 36px;
    background-color: #FFFFFF;
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
    display: block;
    border-radius: 30px;
    padding: 10px;
    transition: all 0.4s ease;
  }
  .close-icon a:hover {
    background-color: var(--q-primary);
  }
  .close-icon a img {
    filter: invert(78%) sepia(1%) saturate(0%) hue-rotate(143deg) brightness(88%) contrast(88%);
    height: 16px;
    transition: all 0.4s ease;
  }
  .close-icon a:hover img {
    filter: invert(100%) sepia(8%) saturate(0%) hue-rotate(123deg) brightness(100%) contrast(101%);
  }
}
@media (max-width: 640px) {
  .sidebar-main .sidebar {
    width: 100%;
    border-bottom-left-radius: 0;
    border-top-right-radius: 60px;
    height: 450px;
    bottom: -400px;
  }
  .sidebar-main.open .sidebar {
    bottom: 0;
  }
  .close-icon a img {
    display: none;
  }
  .close-icon a {
    width: 60%;
    height: 6px;
    display: block;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    margin: 0 auto;
  }
  /* @media(max-width:420px) {
   .sidebar-main .sidebar {
    height: 450px;
  }
}
@media(max-width:395px) {
    .sidebar-main .sidebar {
    height: 450px;
  }
}
@media(max-width:380px) {
    .sidebar-main .sidebar {
    height: 420px;
  }

} */

}

@media (max-width: 420px) {
  .sidebar-main .sidebar {
    width: 100%;
    border-bottom-left-radius: 0;
    border-top-right-radius: 60px;
    height: 500px;
    bottom: -400px;
    z-index: 999;
  }
}
</style>
