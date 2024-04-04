import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ListItemLinkProps } from "./index.types";
import ListItemWrap from "./index.styles";

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  itemProps,
  ref
) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink({ icon, primary, to, active }: ListItemLinkProps) {
  return (
    <ListItemWrap isactive={`${active}`}>
      <ListItem component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </ListItemWrap>
  );
}

export default ListItemLink;
