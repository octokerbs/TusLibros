import { Metadata } from "next";
import Content from "./components/Content";

export const metadata: Metadata = {
        title: "TusLibros",
        description: "BookShop built in Go and Nextjs with TDD",
};

// No me juzguen, es la segunda vez en mi vida que hago frontend ^_^

export default function MainPage() {
        return <Content />;
}
