function data() {
  // Retrieve theme preference from localStorage or default system preference
  function getThemeFromLocalStorage() {
    const darkTheme = window.localStorage.getItem('dark')
    return darkTheme ? JSON.parse(darkTheme) : !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // Save the theme preference to localStorage
  function setThemeToLocalStorage(value) {
    window.localStorage.setItem('dark', value)
  }

  // Create a dynamic state for any menu based on its name
  function createMenuState(menuName) {
    return {
      [`is${menuName}MenuOpen`]: false,
      [`toggle${menuName}Menu`]() {
        this[`is${menuName}MenuOpen`] = !this[`is${menuName}MenuOpen`]
      },
      [`close${menuName}Menu`](){
        this[`is${menuName}MenuOpen`] = false
      }
    }
  }

  const menuNames = [
    'Side', 'Notifications', 'Profile', 'AI', 'Downloader', 'Islamic', 'Search', 'ImageMaker', 'Stalk'
  ];

  const menuState = menuNames.reduce((acc, menuName) => {
    return { ...acc, ...createMenuState(menuName) }
  }, {})

  return {
    dark: getThemeFromLocalStorage(),
    toggleTheme() {
      this.dark = !this.dark
      setThemeToLocalStorage(this.dark)
    },
    isFullScreen: !!document.fullscreenElement,
    toggleScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          this.isFullScreen = true
        }).catch(err => console.log(err))
      } else {
        document.exitFullscreen().then(() => {
          this.isFullScreen = false
        }).catch(err => console.log(err))
      }
    },
    ...menuState,
    // Modal
    isModalOpen: false,
    trapCleanup: null,
    openModal() {
      this.isModalOpen = true
      this.trapCleanup = focusTrap(document.querySelector('#modal'))
    },
    closeModal() {
      this.isModalOpen = false
      this.trapCleanup()
    }
  }
}
