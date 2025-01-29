// import Abu_dhabi from "../../../../../public/assets/AbuDhabi.jpg"
import Dubai from "../../../../../public/assets/dubai.jpg"
import Berlin from "../../../../../public/assets/berlin.jpg"
import Hamburg from "../../../../../public/assets/Hamburg.jpg"
import Paris from "../../../../../public/assets/paris.jpg"
// import St_tropez from "../../../../../public/assets/StTropez.jpg"
import Tokyo from "../../../../../public/assets/Tokyo.jpg";
// import Mumbai from "../../../../../public/assets/Mumbai.jpg"
import Delhi from "../../../../../public/assets/Delhi.jpg"
import beijing from "../../../../../public/assets/beijing.jpg"
import Istanbul from "../../../../../public/assets/Istanbul.jpg";
import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const beijing_listings = await db.listing.count({
            where: {
                location: "北京"
            }
        })
        
        const paris_listings = await db.listing.count({
            where: {
                location: "巴黎"
            }
        })
        const dubai_listings = await db.listing.count({
            where: {
                location: "迪拜"
            }
        })


        const delhi_listings = await db.listing.count({
            where: {
                location: "德里"
            }
        })


        const berlin_listings = await db.listing.count({
            where: {
                location: "柏林"
            }
        })

        const hamburg_listings = await db.listing.count({
            where: {
                location: "汉堡"
            }
        })

        // const st_tropez_listings = await db.listing.count({
        //     where: {
        //         location: "圣托里尼"
        //     }
        // })
        const tokyo_listings = await db.listing.count({
            where: {
                location: "东京"
            }
        })
        // const abudhabi_listings = await db.listing.count({
        //     where: {
        //         location: "Abu_dhabi"
        //     }
        // })
        // const mumbai_listings = await db.listing.count({
        //     where: {
        //         location: "mumbai"
        //     }
        // })
        const Istanbul_listings = await db.listing.count({
            where: {
                location: "伊斯坦布尔"
            }
        })

        

        const results = [
            {
                numOfPlaces: beijing_listings,
                image: beijing,
                value: "北京"
            },
            {
                numOfPlaces: Istanbul_listings,
                image: Istanbul,
                value: "伊斯坦布尔"
            },
            {
                numOfPlaces: dubai_listings,
                image: Dubai,
                value: "迪拜"
            },
            // {
            //     numOfPlaces: abudhabi_listings,
            //     image: Abu_dhabi,
            //     value: "阿布扎比"
            // },
            // {
            //     numOfPlaces: mumbai_listings,
            //     image: Mumbai,
            //     value: "孟买"
            // },
            {
                numOfPlaces: delhi_listings,
                image: Delhi,
                value: "德里"
            },
            {
                numOfPlaces: berlin_listings,
                image: Berlin,
                value: "柏林"
            },
            {
                numOfPlaces: hamburg_listings,
                image: Hamburg,
                value: "汉堡"
            },
            // {
            //     numOfPlaces: st_tropez_listings,
            //     image: St_tropez,
            //     value: "圣托里尼"
            // },
            {
                numOfPlaces: tokyo_listings,
                image: Tokyo,
                value: "东京"
            },
            {
                numOfPlaces: paris_listings,
                image: Paris,
                value: "巴黎"
            },
        ]

        const sortedResults = results.sort((a, b) => b.numOfPlaces - a.numOfPlaces).slice(0, 16)

        return NextResponse.json(sortedResults)
    } catch (error) {
        return NextResponse.error(error)
    }
}