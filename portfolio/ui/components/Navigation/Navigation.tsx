import { routes } from "@/constants/routes";
import { MenuItem } from "@/models/general";
import Link from "next/link";
import React, { FC } from "react";
import classes from "./Navigation.module.scss";

interface NavigationProps {
  navItems: MenuItem[];
}

const Navigation: FC<NavigationProps> = ({ navItems }) => {
  return (
    <nav className={classes.container}>
      <ul>
        {navItems.map((item, index) => (
          <li key={`item-${index}`}>
            <Link href={item.route}>
              <span>{item.pageName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
