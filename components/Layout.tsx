import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import styled from "@emotion/styled";
import { AppBar, AppBarProvider, AppBarItem } from "@dfds-ui/react-components";

type Props = {
  children?: ReactNode;
  title?: string;
};

const StyledAppBar = styled(AppBar)`
  button {
    display: none;
  }
  && {
    height: auto;
    padding-bottom: 10px;
  }
`;

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <AppBarProvider>
      <StyledAppBar>
        <Link href="/">
          <a>
            <AppBarItem title="Home" id="home" />
          </a>
        </Link>

        <Link href="/BoxStarTrek">
          <a>
            <AppBarItem title="Borg cube" id="starTrekDemo" />
          </a>
        </Link>

        <Link href="/TextDemo">
          <a>
            <AppBarItem title="Text effect" id="TextDemo" />
          </a>
        </Link>
        
        <Link href="/BoxStarTrekEffects">
          <a>
            <AppBarItem title="More Effects" id="userList" />
          </a>
        </Link>
      </StyledAppBar>
    </AppBarProvider>

    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
