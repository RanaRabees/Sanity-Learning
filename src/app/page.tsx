/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable react/jsx-key */
'use client'
import React from 'react'
import { Image as IImage } from 'sanity';
import Image from 'next/image';
import { urlForImage } from '../../sanity/lib/image';
// import getProductData from './getProductData';

import { client } from "./lib/sanityClient"

const getProductData = async () => {
    console.log("Data Fetched Start");
    const res = await client.fetch(`*[_type== 'product']{
      title,
      description,
      price,
      image
    }`);
    console.log("Data Fetched End");
    return res
}



interface ProductInterface {
    title: string;
    description: string;
    price: number;
    image: IImage;
}

export default async function Home() {
    const data: ProductInterface[] = await getProductData()
    // const data = await getProductData()
    console.log(data)

    function handleClick() {
        alert("click chal para he bhia jan");
    }
    return (
        <>
            <center>
                <button onClick={handleClick}>
                    Click me
                </button>

                <h1 className='text-4xl'>Welcome!!! <br /><br /> Buy Any Thing That You Want</h1>
                <button onClick={getProductData}>
                    Refresh ME!!!
                </button>
            </center><br /><br />
            <div className="text-center p-10 grid grid-cols-[repeat(2,auto)] justify-center gap-x-10">
                {data.map((data: any) => (
                    <>
                        <div>
                            <Image width={400} height={400} className='h-[400px] w-[400px] object-fill bg-green-200'
                                src={urlForImage(data.image).url()} alt={data.title} />
                            <br /><br />
                            <h1 className='text-xl text-red-600 font-extrabold'>{data.title}</h1><br />
                            <h1 className='text-xl text-red-600 font-extrabold'>{data.description}</h1><br />
                            <h1 className='text-xl text-red-600 font-extrabold'>RS: {data.price}</h1><br />
                            <button className='text-xl border py-2 px-4 rounded bg-pink-600 text-black font-extrabold'>Add To Cart</button>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}
