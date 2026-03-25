"use client";

import styled from "styled-components";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Title from "@/app/components/Title";

// --- Types ---

type LinearSensor = {
    av: number;
    mn: number;
    mx: number;
    ct: number;
};

type CompassPoint = {
    compass_degrees: number;
    compass_point: string;
    compass_right: number;
    compass_up: number;
    ct: number;
};

type SolData = {
    AT?: LinearSensor;
    HWS?: LinearSensor;
    PRE?: LinearSensor;
    WD?: { most_common: CompassPoint | null; [key: string]: CompassPoint | null | undefined };
    Season: string;
    First_UTC: string;
    Last_UTC: string;
};

type WeatherResponse = {
    sol_keys: string[];
    [sol: string]: SolData | string[];
};

// --- Styled Components ---

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const BackLink = styled(Link)`
    align-self: flex-start;
    color: darkseagreen;
    text-decoration: none;
    margin-bottom: 2vh;
    &:hover {
        text-decoration: underline;
    }
`;

const Meta = styled.p`
    margin-bottom: 1vh;
    text-align: center;
    color: darkseagreen;
    text-transform: capitalize;
`;

const CardsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: calc(10px + 1vh);
    justify-content: center;
    margin-top: 3vh;
    width: 100%;
    max-width: 900px;
`;

const Card = styled.section`
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: calc(12px + 1vh) calc(16px + 1vw);
    min-width: 180px;
    flex: 1 1 180px;
    text-align: center;

    & h3 {
        margin-bottom: 1vh;
        font-size: calc(14px + 1.5vh);
        color: darkseagreen;
    }

    & p {
        font-size: calc(16px + 2vh);
        margin-bottom: 0.5vh;
    }

    & small {
        font-size: calc(10px + 0.8vh);
        color: darkseagreen;
        margin-top: 0.5vh;
        display: block;
    }
`;

const NotFound = styled.div`
    text-align: center;
    margin-top: 4vh;

    & h2 {
        margin-bottom: 2vh;
    }

    & p {
        color: darkseagreen;
    }
`;

const StatusText = styled.p`
    text-align: center;
    margin-top: 4vh;
    color: darkseagreen;
`;

// --- Helper ---

function formatUTC(utc: string) {
    return new Date(utc).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

// --- Page ---

export default function SolPage() {
    const params = useParams();
    const sol: string = Array.isArray(params.sol) ? params.sol[0] : (params.sol ?? "");

    const [data, setData] = useState<WeatherResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/getWeatherData")
            .then((res) => res.json())
            .then((json: WeatherResponse & { error?: string; detail?: string }) => {
                if (json.error) throw new Error(`${json.error}${json.detail ? `: ${json.detail}` : ""}`);
                setData(json);
            })
            .catch((err: Error) => setError(err.message));
    }, []);

    if (error) {
        return (
            <PageWrapper>
                <BackLink href="/">← Back</BackLink>
                <StatusText>Failed to load data: {error}</StatusText>
            </PageWrapper>
        );
    }

    if (!data) {
        return (
            <PageWrapper>
                <BackLink href="/">← Back</BackLink>
                <StatusText>Loading…</StatusText>
            </PageWrapper>
        );
    }

    if (!data.sol_keys?.includes(sol)) {
        return (
            <PageWrapper>
                <BackLink href="/">← Back</BackLink>
                <NotFound>
                    <h2>Sol {sol} not available</h2>
                    <p>Available sols: {data.sol_keys?.join(", ") ?? "none"}</p>
                </NotFound>
            </PageWrapper>
        );
    }

    const solData = data[sol] as SolData;

    return (
        <PageWrapper>
            <BackLink href="/">← Back</BackLink>
            <Title>Sol {sol}</Title>
            <Meta>Season: {solData.Season}</Meta>
            <Meta>
                {formatUTC(solData.First_UTC)} – {formatUTC(solData.Last_UTC)}
            </Meta>

            <CardsGrid>
                {solData.AT && (
                    <Card>
                        <h3>Temperature</h3>
                        <p>{solData.AT.av.toFixed(1)} °C</p>
                        <small>↑ {solData.AT.mx.toFixed(1)} °C &nbsp;|&nbsp; ↓ {solData.AT.mn.toFixed(1)} °C</small>
                    </Card>
                )}

                {solData.PRE && (
                    <Card>
                        <h3>Pressure</h3>
                        <p>{solData.PRE.av.toFixed(1)} Pa</p>
                        <small>↑ {solData.PRE.mx.toFixed(1)} Pa &nbsp;|&nbsp; ↓ {solData.PRE.mn.toFixed(1)} Pa</small>
                    </Card>
                )}

                {solData.HWS && (
                    <Card>
                        <h3>Wind Speed</h3>
                        <p>{solData.HWS.av.toFixed(2)} m/s</p>
                        <small>↑ {solData.HWS.mx.toFixed(2)} m/s &nbsp;|&nbsp; ↓ {solData.HWS.mn.toFixed(2)} m/s</small>
                    </Card>
                )}

                {solData.WD && (
                    <Card>
                        <h3>Wind Direction</h3>
                        <p>{solData.WD.most_common ? solData.WD.most_common.compass_point : "N/A"}</p>
                        {solData.WD.most_common && (
                            <small>{solData.WD.most_common.compass_degrees}°</small>
                        )}
                    </Card>
                )}
            </CardsGrid>
        </PageWrapper>
    );
}
