import WordMark from "@/components/WordMark";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

export default async function Footer() {
    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <footer className="flex flex-col justify-between items-center gap-6 border-t border-slate-600
            px-8 py-7 md:flex-row">
            <Link href="/">
                <WordMark />
                <span className="sr-only">Homepage</span>
            </Link>
            <nav aria-label="Footer">
                <ul className="flex gap-6">
                    {settings.data.navigation.map((item, index) => (
                        <li key={index}>
                            <PrismicNextLink field={item.link} className="inline-flex min-h-11 items-center">
                                {item.label}
                            </PrismicNextLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </footer>
    )
}
