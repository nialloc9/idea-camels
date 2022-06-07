/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
export default function Layout({ children, content, onSetExperiment }) {
  return (
    <Flex
      sx={{
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Header content={content} onSetExperiment={onSetExperiment} />
      <main
        sx={{
          variant: "layout.main",
        }}
      >
        {children}
      </main>
      <Footer content={content} onSetExperiment={onSetExperiment} />
    </Flex>
  );
}
