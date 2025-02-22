import {Metadata} from "next";
import TusLibros from "./TusLibros";

export const metadata: Metadata = {
    title: "TusLibros",
    description: "BookShop built in Go and NextJS with TDD",
};

export default function MainPage() {
    return <TusLibros/>;
}