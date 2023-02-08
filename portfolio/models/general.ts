import { routes } from "@/constants/routes";

export interface MenuItem {
    pageName: string;
    route: routes;
    icon?: string;
}