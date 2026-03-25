"use client";

import type React from "react";
import styled from "styled-components";

const StyledH2 = styled.h2`
    margin: 6vh auto 3vh auto;
    text-align: center;
    font-size: calc(18px + 3vh);
`;

export default function Title({ children }: { children: React.ReactNode }) {
    return <StyledH2>{children}</StyledH2>;
}
