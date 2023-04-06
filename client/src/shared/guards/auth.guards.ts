import { useUser } from "../../store/userStore";

//Objectif: Rediriger l'utilisateur vers la page de connexion s'il n'est pas authentifié
export function isAuthenticatedGuard() {
  const userStore = useUser();
  if (!userStore.isAuthenticated) {
      return "/";
  }
}
export function isNotAuthenticatedGuard() {
  const userStore = useUser();
  if (userStore.isAuthenticated) {
      return "/";
  }
}