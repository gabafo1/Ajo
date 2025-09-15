import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardTitle } from "../../../components/ui/card"


export function AdBanner() {
  return (
    <Card className=" h-[200px] overflow-hidden">
        <Link href='#' className="block h-full">
            <CardContent className="p-0 h-full flex flex-row items-center">
                <div className="relative">
                    <Image src="/alajo33.png" alt="Mobile app logo" width={200} height={200} objectFit="cover" />
                </div>
                <div className="p-4 w-1/2">
                    <CardTitle>Download Our App!</CardTitle>
                    <CardDescription>Get your analytics anywhere you go.</CardDescription>
                </div>
            </CardContent>
        </Link>
    </Card>
  )
}
