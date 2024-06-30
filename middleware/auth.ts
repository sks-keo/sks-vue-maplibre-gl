export default defineNuxtRouteMiddleware((to, from) => {
    const {isAuthenticated} = useAuth(); 

    if (!isAuthenticated() && to.path !== '/login') {
      return navigateTo('/login');
    }
  });