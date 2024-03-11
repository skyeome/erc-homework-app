import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MicIcon from "@mui/icons-material/Mic";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { NavItem, NavigationProps } from "./index.types";
import * as Styled from "./index.styles";

const NAV_ITEMS: NavItem[] = [
  {
    to: "/",
    label: "HOME",
    icon: <HomeIcon />,
  },
  {
    to: "/record",
    label: "RECORD",
    icon: <MicIcon />,
  },
  {
    to: "/reading",
    label: "READING",
    icon: <AutoStoriesIcon />,
  },
  {
    to: "/workbook",
    label: "WORKBOOK",
    icon: <StickyNote2Icon />,
  },
];

function Navigation({ pathname }: NavigationProps) {
  return (
    <>
      <Styled.NavigationSpacing />
      <Styled.NavigationWrap>
        <ul className="inner">
          {NAV_ITEMS.map((item) => (
            <Styled.NavigationItem
              key={item.label}
              active={`${
                item.to === "/"
                  ? pathname === item.to
                  : pathname.startsWith(item.to)
              }`}
            >
              <Link to={item.to}>
                <Typography variant="body1">{item.icon}</Typography>
                <Typography variant="body2">{item.label}</Typography>
              </Link>
            </Styled.NavigationItem>
          ))}
        </ul>
      </Styled.NavigationWrap>
    </>
  );
}

export default Navigation;
