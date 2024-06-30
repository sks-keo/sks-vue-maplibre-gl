export default defineNuxtPlugin(() => {
  const cookie = useCookie("token");
  const config = useRuntimeConfig();
  const authBaseUrl = config.public.authBaseUrl;

  const tokenAuthUrl = "/security/authorize";
  const tokensRefreshUrl = "/security/refresh";

  const api = $fetch.create({
    onRequest({ options }) {
      if (cookie.value) {
        const headers = (options.headers ||= {
          "Content-Type": "application/json",
        });
        if (Array.isArray(headers)) {
          headers.push(["Authorization", `Bearer ${cookie.value}`]);
        } else if (headers instanceof Headers) {
          headers.set("Authorization", `Bearer ${cookie.value}`);
        } else {
          headers.Authorization = `Bearer ${cookie.value}`;
        }
      }
    },
    async onResponseError({ response, request }) {
      // set refresh token before redirecting to login
      if (
        response.status === 401 &&
        response.url !== tokenAuthUrl &&
        response.url !== tokensRefreshUrl &&
        !!cookie.value
      ) {
        try {
          const { data } = await $fetch<{ data: { token: string } }>(
            `${authBaseUrl}${tokensRefreshUrl}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          cookie.value = data.token;
          return $fetch(request);
        } catch (e) {
          cookie.value = null;
        }
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
