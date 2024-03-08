import { ReactNode } from "react";

export interface NavigationProps {
  pathname: string;
}

export interface NavigationItemProps {
  active: string;
}

export interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
}
