"use client";

import styled from "styled-components";
import Link from "next/link";
import {useRef, useState} from "react";


const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: calc(5px + 0.1vh);
`;

export default function SearchBar() {
    const [sol, setSol] = useState("");
    const linkRef = useRef<HTMLAnchorElement>(null);

    return (
        <StyledDiv>
            <input
                type="text"
                value={sol}
                placeholder="Enter Sol"
                onChange={(e) => setSol(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") linkRef.current?.click(); }}
            />
            <Link href={`/${sol}`} ref={linkRef}>
                <button>Get Report</button>
            </Link>
        </StyledDiv>
    )
}