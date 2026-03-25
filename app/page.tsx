// import Image from "next/image";

"use client";

import styled from "styled-components";
import {useState, useEffect} from "react";

import SearchBar from "@/app/components/SearchBar";

const StyledH1 = styled.h1`
    margin: 8vh auto 6vh auto;
    text-align: center;
    max-width: 100vw;
    font-size: calc(20px + 5vh);
    font-weight: initial;
`;

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    & h2 {
        margin-bottom: 1vh;
        font-size: calc(16px + 2vh);
    }
    
    & p {
        margin-bottom: 5vh;
    }
    
    & label {
        color: darkseagreen;
        margin-bottom: 1vh;
    }
    
    & input {
        color: maroon;
        padding: 0 0 0 calc(6px + 0.5vh);
        &:focus {
            outline-color: darkgreen;
        }
        &::placeholder {
            color: darkseagreen;
        }
    }
    
    & button {
        color: green;
        padding: calc(3px + 0.25vh) calc(6px + 0.5vh);
        box-sizing: border-box;
        text-align: center;
    }
`;

export default function Home() {
    const [solKeys, setSolKeys] = useState<string[]>([]);

    useEffect(() => {
        fetch("/api/getWeatherData")
            .then((res) => res.json())
            .then((data) => { if (Array.isArray(data?.sol_keys)) setSolKeys(data.sol_keys); })
            .catch(() => {});
    }, []);

    const labelText = solKeys.length > 0
        ? `Enter a Sol number (current available Sols: ${solKeys.join(", ")})`
        : "Enter a number of Sol (Martian Day, e.g. 259)";

    return (
        <>
            <StyledH1>Welcome to Mars_</StyledH1>
            <StyledSection>
                <h2>Hello Mars!</h2>
                <p>This website will show you the weather report from NASA{"'"}s InSight Mars lander.</p>
                <label>{labelText}</label>
                <SearchBar />
            </StyledSection>
        </>
    )
}