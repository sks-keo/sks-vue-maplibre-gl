import type { User } from "~/types";
import { useAuthUser } from "./useAuthUser";

export const useAuth = () => {
  const { $api } = useNuxtApp();
  const authUser = useAuthUser();
  const config = useRuntimeConfig();
  const cookie = useCookie("token");

  const authBaseUrl = config.public.authBaseUrl;

  const setUser = (user: User) => {
    authUser.value = user;
  };

  const setCookie = (value: string | null) => {
    cookie.value = value;
  };

  const login = async (email: string, password: string) => {
    const { data } = await $api<{ data: { token: string; email: string } }>(
      `${authBaseUrl}/security/authorize`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}`)}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        // credentials: "include",
      }
    );
    setCookie(data.token);
    setUser({ email: data.email } as User);
    navigateTo("/");
    return authUser;
  };

  const logout = async () => {
    setCookie(null);
    setUser({} as User);
  };

  const me = async () => {
    if (!authUser.value) {
      try {
        const { data } = await $api<{ data: User }>(`${authBaseUrl}/users/me`, {
          method: "GET",
        });
        setUser(data);
      } catch (error) {
        setCookie(null);
      }
    }

    return authUser;
  };

  const isAuthenticated = () => {
    return !!authUser.value || !!cookie.value;
  };

  return {
    login,
    logout,
    me,
    isAuthenticated,
  };
};
