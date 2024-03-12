import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

function AddBook() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const FabSx = { position: "fixed", bottom: "5rem", right: "1rem" };
  const ListIconSx = { minWidth: 30 };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleClick} sx={FabSx}>
        <BookmarkAddIcon />
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <List dense>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={ListIconSx}>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="책 이름 검색" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={ListIconSx}>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="직접 입력" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}

export default AddBook;
