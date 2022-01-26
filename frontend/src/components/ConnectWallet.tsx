import * as React from "react";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  Connection,
  useWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";

import WalletIcon from "components/WalletIcon";

const useStyles = makeStyles(() => ({
  container: {
    margin: "1rem",
  },
}));
function SplitButton() {
  const classes = useStyles();
  const { status, availableConnections, connect, disconnect } = useWallet();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleClick = () => {
    if (status === WalletStatus.WALLET_NOT_CONNECTED) {
      const { type, identifier } = availableConnections[selectedIndex];
      connect(type, identifier);
    } else {
      disconnect();
    }
  };

  const handleMenuItemClick = (_event: any, index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    // @ts-ignore
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const getWalletName = (connection: Connection) => {
    if (status === WalletStatus.WALLET_CONNECTED) {
      return "disconnect";
    }

    let name = connection?.name;
    if (connection?.identifier) {
      name = `${name} (${connection?.identifier})`;
    }
    return name;
  };

  return (
    <div className={classes.container}>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick}>
          <WalletIcon connection={availableConnections[selectedIndex]} />
          {getWalletName(availableConnections[selectedIndex])}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          sx={{
            padding: "0.75rem 0",
          }}
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {status === WalletStatus.WALLET_NOT_CONNECTED ? (
                    <>
                      {availableConnections.map((connection, index) => (
                        <MenuItem
                          key={"connection-" + connection.type}
                          disabled={index === 2}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          <WalletIcon connection={connection} />
                          {getWalletName(connection)}
                        </MenuItem>
                      ))}
                    </>
                  ) : (
                    <MenuItem
                      key="disconnected"
                      selected
                      onClick={(event) => handleMenuItemClick(event, 0)}
                    >
                      Disconnect
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default SplitButton;
