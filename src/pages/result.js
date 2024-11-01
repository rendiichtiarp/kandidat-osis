import Head from 'next/head'
import {Box, Flex, ScaleFade, Text} from "@chakra-ui/react";
import axios from "axios";
import {ENV} from "@/utility/const";

export default function Result({datas,info}) {
    const candidates = [
        { name1: "Revan Revaldo", name2: "Dafila Sulistiana Putri" },
        { name1: "Ita Adika Syilvia", name2: "Tasya Nur Fadila" },
        { name1: "Raditya Caesar Hidayat", name2: "Nurazizah" },
    ];

    return (
        <>
            <Head>
                <title>{info.judul_web ?? 'Null Data'}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
                <ScaleFade initialScale={0.5} in={true}>
                <Box bgGradient="linear(to-r, green.400, green.600)" w={'full'} maxW={'1200'} backdropBlur={"md"} borderRadius={10} p={4}>
                    <Text fontSize="2xl" fontWeight="bold" color={'#fff'} mb={4} textAlign="center">
                        Selamat Kepada Kandidat Terpilih!
                    </Text>
                    {
                        candidates.map((candidate, index) => (
                            <Flex key={index} borderWidth="1px" borderRadius="lg" p={4} mb={4} align="center">
                                <Box textAlign="center" flex="1">
                                    <Text fontWeight="bold" color={'#fff'}>
                                        Kandidat {index + 1}:
                                    </Text>
                                    <Text fontWeight="bold" color={'#fff'}>
                                        {candidate.name1} & {candidate.name2}
                                    </Text>
                                </Box>
                            </Flex>
                        ))
                    }
                </Box>
                <Text color={'#999'} fontSize={'0.8rem'} fontFamily={'Lato'} mb={'30px'}>
                    Dibuat oleh <a href="https://www.instagram.com/rendiichtiar" target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'underline' }}>@rendiichtiar</a> dengan ❤️ | Copyright © 2024
                </Text>
                </ScaleFade>
        </>
    )
}

// This gets called on every request
export async function getServerSideProps(context) {
    const { req } = context
    const { headers } = req
    const student = await axios.get( ENV.base + '/api/student',{
        credentials:'include',
        headers:{
            cookie:headers.cookie
        }
    })
    const info = await axios.get(ENV.base + '/api/info')
    const data2 = await info.data
    const {data} = await student.data
    return {
        props: {
            datas: data,
            info: data2.data
        },
    };
}
