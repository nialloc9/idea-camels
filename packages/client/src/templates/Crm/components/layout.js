/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import React from "react";
import Footer from "./footer/footer";
export default function Layout({ children, content, onSetContent }) {
  return (
    <Flex
      sx={{
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <main
        sx={{
          variant: "layout.main",
        }}
      >
        {children}
      </main>
      <Footer content={content} onSetContent={onSetContent} />
    </Flex>
  );
}
