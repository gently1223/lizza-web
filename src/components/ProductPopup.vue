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

        <h4 class="heading">¡Tu catálogo en línea está listo!</h4>
        <div class="text-weight-thin subtext">Agrega tu link a tu bio de Instagram y comienza a vender💸</div>
        <div class="input-text">
            <q-input  class="input-1 input-area" readonly  color="primary"
                  v-model="productlink" 
                  
                       >
                    <template v-slot:prepend >
                      <div class="copy" @click="showNotif">
                           <q-icon color="primary" style="padding-left:14px; cursor:pointer" @click="handleClipboard()"  >
                        <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.1721 5.40039H2.87202C2.37654 5.40144 1.90161 5.59846 1.55088 5.94844C1.20015 6.29842 1.00211 6.77294 1 7.26841V23.1246C0.999999 23.6214 1.1971 24.098 1.54806 24.4497C1.89902 24.8014 2.37516 24.9995 2.87202 25.0006H14.1721C14.6697 25.0006 15.1469 24.803 15.4987 24.4511C15.8505 24.0993 16.0482 23.6221 16.0482 23.1246V7.26841C16.046 6.77225 15.8475 6.29713 15.4959 5.94703C15.1443 5.59694 14.6683 5.40039 14.1721 5.40039ZM15.2482 23.1326C15.246 23.4166 15.1317 23.6882 14.9302 23.8883C14.7286 24.0883 14.4561 24.2006 14.1721 24.2006H2.87202C2.58734 24.1995 2.31468 24.0857 2.11375 23.884C1.91282 23.6824 1.80001 23.4093 1.80001 23.1246V7.26841C1.80211 6.98511 1.91586 6.71408 2.11656 6.51413C2.31726 6.31418 2.58872 6.20144 2.87202 6.2004H14.1721C14.4575 6.2004 14.7312 6.31376 14.933 6.51556C15.1348 6.71735 15.2482 6.99104 15.2482 7.27641V23.1326Z" fill="#DDDDDD" stroke="#E75935"/>
                          <path d="M18.6162 1H7.22411C6.73892 0.999999 6.27354 1.19247 5.93009 1.53517C5.58663 1.87788 5.39315 2.34283 5.39209 2.82802V4.24804C5.39209 4.35412 5.43423 4.45587 5.50925 4.53088C5.58426 4.6059 5.68601 4.64804 5.79209 4.64804C5.89818 4.64804 5.99992 4.6059 6.07494 4.53088C6.14995 4.45587 6.1921 4.35412 6.1921 4.24804V2.82802C6.19316 2.55501 6.30235 2.29354 6.49578 2.10086C6.6892 1.90819 6.95109 1.80001 7.22411 1.80001H18.6162C18.8882 1.80107 19.1486 1.90984 19.3406 2.10252C19.5325 2.29519 19.6402 2.55607 19.6402 2.82802V18.7762C19.6381 19.0471 19.5296 19.3064 19.338 19.498C19.1464 19.6896 18.8872 19.7981 18.6162 19.8002H17.3202C17.2141 19.8002 17.1124 19.8423 17.0374 19.9174C16.9624 19.9924 16.9202 20.0941 16.9202 20.2002C16.9202 20.3063 16.9624 20.408 17.0374 20.4831C17.1124 20.5581 17.2141 20.6002 17.3202 20.6002H18.6162C19.1014 20.5992 19.5664 20.4057 19.9091 20.0622C20.2518 19.7188 20.4443 19.2534 20.4442 18.7682V2.82802C20.4442 2.3432 20.2517 1.87823 19.9088 1.53541C19.566 1.19259 19.1011 1 18.6162 1Z" fill="#DDDDDD" stroke="#E75935"/>
                        </svg>
                      </q-icon>
                      <span style="padding: 0px 10px;">|</span>
                      </div>
                      
                    </template>
                  </q-input>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthApi } from 'src/factories/useAuthApi';
import { useUserApi } from 'src/factories/useUserApi';
import { defineComponent, ref } from 'vue';
import { copyToClipboard, useQuasar } from 'quasar';


const { user } = useUserApi();
const username = user.value?.username;
const productlink = 'https://lizza.app/' + String(username);
const copied = ref(false);

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
        //   link: `https://web.lizzapp.com/products/${user.value?.username}`,
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
    const $q = useQuasar();
     const showNotif = () => {
        $q.notify({
          message: 'Copied!',
          color: 'primary'
        })
      }
    return { 
      logout,
      props,
      productlink,
      showNotif
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

body {
font-family: 'Manrope';
font-style: normal;
}
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
.heading {
font-weight: 600;
font-size: 20px;
line-height: 28px;
text-align: center;
color: #E75935;

}
.subtext {
width: 301px;
height: 44px;
font-weight: 400;
font-size: 16px;
line-height: 22px;
text-align: center;
color: #AAAAAA;
}

.input-1 {
    display:flex; 
    position: relative;
    width: 305px;
    height: 50px;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #E75935;
    background: #FFFFFF;
    align-content: center;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    border-radius: 100px;
    overflow: hidden;
    margin-top: 30px;  
    display: flex;

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
    height: 300px;
    bottom: -400px;
    z-index: 999;
  }
}
</style>
