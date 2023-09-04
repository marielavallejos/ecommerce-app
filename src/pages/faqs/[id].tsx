import { Layout } from "@/components/layouts/Layout";
import { Faq } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const FaqPage = () => {
    const[faq, setfaq] = useState({} as Faq);
    const { query } = useRouter();
    const id = query.id;
    const getFaq = async () => {
        if (id) {
        const response = await fetch(`/api/faqs/${id}`);
        const data= await response.json();
        setfaq(data);
        };
    };
    useEffect(() => {
        getFaq()
    }, [id]);
    return (
    <Layout title="Fregunta frecuente">
        <h1>{faq.question}</h1>
        <p>{faq.answer}</p>
    </Layout>
    );
}

export default FaqPage;