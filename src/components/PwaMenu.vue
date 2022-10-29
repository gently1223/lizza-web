<template>
  <!-- Desktop -->
  <div class="sidebar-main open" >
    <q-header elevated style="background-color: #e75935; padding: 20px;" class="header">
        <q-toolbar>
          <img class="menu_icon_header" src='icons/lizza_logo.png' />
          <q-space />
          <q-tabs class="nav-right-icons">
            <p class="text-h4 text-weight-bold" style="margin: 0px; algin-items: center">The Skin Lab</p>
            <q-btn color="white" text-color="black" size="20px" round icon="polyline">
            </q-btn>
            <q-btn color="white" text-color="black" size="20px" round icon="message">
              <span
              class="alert" 
              >
              </span>
            </q-btn>
            <q-btn color="white" text-color="black" size="20px" round icon="notifications_active">
              <span 
              class="alert"
              >
              </span>
            </q-btn>
          </q-tabs>
            
        </q-toolbar>
    </q-header>
    <div class="sidebar">
      <div class="my-scroll">
        <p class="nav-list" style="margin-bottom: 10px!important;">
          <span  class="text-dark text-h5">
            The Skin Lab
          </span>
        </p>
        <q-input  class="input-1 input-area" readonly
                  v-model="productlink">
                    <template v-slot:prepend style="border-right: 3px solid grey">
                      <div class="copy" @click="showNotif">
                          <q-icon color="primary" style="padding-left:20px; padding-bottom: 10px; cursor:pointer" @click="handleClipboard()"  >
                            <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.1721 5.40039H2.87202C2.37654 5.40144 1.90161 5.59846 1.55088 5.94844C1.20015 6.29842 1.00211 6.77294 1 7.26841V23.1246C0.999999 23.6214 1.1971 24.098 1.54806 24.4497C1.89902 24.8014 2.37516 24.9995 2.87202 25.0006H14.1721C14.6697 25.0006 15.1469 24.803 15.4987 24.4511C15.8505 24.0993 16.0482 23.6221 16.0482 23.1246V7.26841C16.046 6.77225 15.8475 6.29713 15.4959 5.94703C15.1443 5.59694 14.6683 5.40039 14.1721 5.40039ZM15.2482 23.1326C15.246 23.4166 15.1317 23.6882 14.9302 23.8883C14.7286 24.0883 14.4561 24.2006 14.1721 24.2006H2.87202C2.58734 24.1995 2.31468 24.0857 2.11375 23.884C1.91282 23.6824 1.80001 23.4093 1.80001 23.1246V7.26841C1.80211 6.98511 1.91586 6.71408 2.11656 6.51413C2.31726 6.31418 2.58872 6.20144 2.87202 6.2004H14.1721C14.4575 6.2004 14.7312 6.31376 14.933 6.51556C15.1348 6.71735 15.2482 6.99104 15.2482 7.27641V23.1326Z" fill="#DDDDDD" stroke="#E75935"/>
                              <path d="M18.6162 1H7.22411C6.73892 0.999999 6.27354 1.19247 5.93009 1.53517C5.58663 1.87788 5.39315 2.34283 5.39209 2.82802V4.24804C5.39209 4.35412 5.43423 4.45587 5.50925 4.53088C5.58426 4.6059 5.68601 4.64804 5.79209 4.64804C5.89818 4.64804 5.99992 4.6059 6.07494 4.53088C6.14995 4.45587 6.1921 4.35412 6.1921 4.24804V2.82802C6.19316 2.55501 6.30235 2.29354 6.49578 2.10086C6.6892 1.90819 6.95109 1.80001 7.22411 1.80001H18.6162C18.8882 1.80107 19.1486 1.90984 19.3406 2.10252C19.5325 2.29519 19.6402 2.55607 19.6402 2.82802V18.7762C19.6381 19.0471 19.5296 19.3064 19.338 19.498C19.1464 19.6896 18.8872 19.7981 18.6162 19.8002H17.3202C17.2141 19.8002 17.1124 19.8423 17.0374 19.9174C16.9624 19.9924 16.9202 20.0941 16.9202 20.2002C16.9202 20.3063 16.9624 20.408 17.0374 20.4831C17.1124 20.5581 17.2141 20.6002 17.3202 20.6002H18.6162C19.1014 20.5992 19.5664 20.4057 19.9091 20.0622C20.2518 19.7188 20.4443 19.2534 20.4442 18.7682V2.82802C20.4442 2.3432 20.2517 1.87823 19.9088 1.53541C19.566 1.19259 19.1011 1 18.6162 1Z" fill="#DDDDDD" stroke="#E75935"/>
                            </svg>
                          </q-icon>
                      </div>
                    </template>
        </q-input>
        <q-separator />
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

  <!-- Mobile -->
  <q-header elevated style="background-color: #ffffff; padding: 20px;" class="mobile-header">
    <q-toolbar>
      <p class="text-h4 text-weight-bold page-title">The Skin Lab</p>
      <q-space />
      <q-tabs class="nav-right-icons">
        <q-btn color="white" text-color="black" size="18px" round icon="message">
          <span
          class="alert" 
          >
          </span>
        </q-btn>
        <q-btn color="white" text-color="black" size="18px" round icon="notifications_active">
          <span 
          class="alert"
          >
          </span>
        </q-btn>
        <q-btn flat size="18px" style="border-radius: 50%;" @click="showSidebar">
          <q-avatar size="60px">
            <img src="icons/plus_button.png">
          </q-avatar>
        </q-btn>
      </q-tabs>  
    </q-toolbar>
</q-header>

<div class="footer">
  <q-footer reveal style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
    <q-toolbar class="row justify-between">
      <div v-for="(menuItem, index) in menuItems" :key="index" class="footer-items">
          <router-link v-if="index < 5" :to="menuItem.link">
            <img class="menu_icon" :src="menuItem.icon" />
            <div class="links_name">{{ menuItem.mobile_name }}</div>
          </router-link>
      </div>
    </q-toolbar>
  </q-footer>
</div>

</template>

<script lang="ts">
import { useAuthApi } from 'src/factories/useAuthApi';
import { defineComponent, ref } from 'vue';
import { useUserApi } from 'src/factories/useUserApi';
import { useProductApi } from 'src/factories/useProductApi';
import { copyToClipboard, useQuasar } from 'quasar';

const { user } = useUserApi();
const username = user.value?.username;
const email = user.value?.email;
const productlink = 'https://lizza.app/' + String(username);

const copied = ref(false);

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
          mobile_name: 'Inicio',
          icon: 'sidebar/house.svg',
        },
        {
          link: '/product',
          name: 'Mis productos',
          mobile_name: 'Productos',
          icon: 'sidebar/shop-alt.svg',
        },
        {
          link: '/payments',
          name: 'Mis ventas',
          mobile_name: 'Ventas',
          icon: 'sidebar/dollar.svg',
        },
        {
          link: '/product',
          mobile_name: 'Envios',
          icon: 'sidebar/truck.svg',  
        },
         {
          link: '/settings',
          name: 'Mi cuenta',
          mobile_name: 'Cuenta',
          icon: 'sidebar/user-circle.svg',
        },
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
    const { products } = useProductApi();
    const $q = useQuasar();

    const handleClipboard = async () => {
        if (copied.value) {
            return;
        }

        await copyToClipboard(productlink);

        // Indicate the copy was successful and reset it after few secs.
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 3000);
    };
    const showNotif = () => {
        $q.notify({
          message: 'Copied!',
          color: 'primary',
          position: 'bottom'
        })
    };
    return {
      productlink,
      products,
      logout,
      props,
      handleClipboard,
      showNotif
      };
  },

  data() {
    return {
      isOpened: false,
    }
  },
  methods: {

  }
}
);
</script>

<style>
html,
body {
    font-family: 'Manrope';
    font-style: normal;

}
.sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 48px 48px 24px !important;
    gap: 36px;
    position: fixed;
    width: 302px;
    height: 100%;
    left: 0px;
    top: 100px;
    background: #FFFFFF;
    z-index: 99;
    transition: all 0.5s ease;
    padding: 30px;
    box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.15);
}
.mobile-sidebar {
  right: 0px!important;
  left: auto!important;
}
.sidebar-main {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  transform: scale(0);
  overflow-y: scroll;
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

.header {
   height: 100px; 
}
.menu_icon_header {
  width: 150px;
  height: 34px;
}
.input-1 {
    display:flex; 
    position: relative;
    justify-content: center;
    align-items: center;
    padding-top: -10px !important;
    width: 254px;
    height: 44px;
    background: #FFFFFF;
    align-content: center;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    border-radius: 100px;
    overflow: hidden;
    color: #434343;
    margin-bottom: 30px;
    color: red;
}

div.nav-right-icons button {
  margin-left: 10px;
}

div.nav-right-icons p {
  align-items: center;  
}

.alert {
  width: 1rem;
  height: 1rem;
  background-color: red;
  top: 8px;
  left: 36px;
  position: absolute;
  border-radius: 50%;
  color: white;
}
.page-title {
  margin: 0px; 
  align-items: center; 
  color: black!important;
}

@media (min-width: 901px) {
  .mobile-header {
    display: none;
  }
  .mobile-sidebar {
    display: none;
  }
  .footer {
    display: none;
  }
}

@media (max-width: 900px) {
  .sidebar-main {
    display: none;
  }
  .mobile-header {
    display: block;
  }
  .mobile-sidebar {
    display: block;
  }
  .footer {
    display: block;
  }
  @media (max-width: 568px) {
    .page-title {
      font-size: 1.2rem;
    }
  }
}

.mobile-header {
  position: fixed;
}
.q-footer {
  background-color: white;
  padding: 16px;
}

.footer-items:nth-child(n+6) {
  display: none;
}

.footer-items a{
  width: 24px;
  height: 24px;
  text-decoration: none;
  transition: all 0.4s ease;
}

.footer-items a img {
  width: 24px;
  height: 24px;
  margin: auto;
}

.footer-items a {
  text-decoration: none;
}

.footer-items a:hover {
  filter: invert(41%) sepia(53%) saturate(2676%) hue-rotate(343deg) brightness(97%) contrast(86%);
}

</style>
