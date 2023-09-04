//SERVER SIDE RENDERING
import { Layout } from "@/components/layouts/Layout";
import { Serie } from "@/types";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import styles from "./Series.module.css"
interface Props {
    series:Serie[]
}

const SeriesPage:NextPage<Props> = ({series}) => {

    return (
        <Layout title="series">
        <h1>Series</h1>
        <div className={styles.grid}>
            {series.map((serie) => (
                <div className={styles.card} key={serie.key}>
                    <h2>{serie.name}</h2>
                    <p>Código: {serie.key}</p>
                </div>
            ))}
        </div>
        </Layout>
    );
};

//Después lo sacamos a un servicio
export const getServerSideProps:GetServerSideProps = async ({req, res}) => {
    const response = await fetch('https://amiiboapi.com/api/amiiboseries/');
    const data : {amiibo: Serie[]} = await response.json();
    const series = data.amiibo;

    //optimizacion, chachear la info y luego validar si cambio o no, es para no recargar el servidor con tantas peticiones
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate');

    return {
        props:{
            series
        },
    }
}

export default SeriesPage