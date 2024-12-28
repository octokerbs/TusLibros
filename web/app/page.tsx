import { Metadata } from "next";
import Content from "./components/Content";

export const metadata: Metadata = {
        title: "TusLibros",
        description: "BookShop built in Go and Nextjs with TDD",
};

export default function MainPage() {
        return <Content />;
}
