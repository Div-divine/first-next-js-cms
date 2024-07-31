"use client";
import { useState } from "react";
import WordMark from "@/components/WordMark";
import { asLink, Content } from "@prismicio/client";
import Link from "next/link";
import BtnLink from "@/components/BtnLink";
import { MdMenu, MdClose } from "react-icons/md"
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { PrismicNextLink } from "@prismicio/next";

type NavBarProp = {
    settings: Content.SettingsDocument
}

export default function NavBar({ settings }: NavBarProp) {
    const [open, setOpen] = useState(false);
    const pathName = usePathname()

    return (
        <nav aria-label="Main" className="px-4 py-4 md:px-6 md:py-6">
            <div className="mx-auto flex max-w-6xl flex-col justify-between py-2
                font-medium text-white md:flex-row md:items-center">
                <div className="flex items-center justify-between">
                    <Link href="/" className="z-50">
                        <WordMark />
                        <span className="sr-only">Homepage</span>
                    </Link>
                    <button type="button"
                        className="block p-2 text-3xl text-white md:hidden"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}>
                        <MdMenu />
                        <span className="sr-only">Open Menu</span>
                    </button>
                </div>

                {/* Mobile Nav */}

                <div className={clsx("fixed bottom-0 top-0 left-0 right-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform ease-in-out motion-reduce:transition-none md:hidden",
                    open ? "translate-x-0" : "translate-x-[100%]"
                )
                }>
                    <button type="button"
                        className="block p-2 text-3xl text-white md:hidden fixed right-4 top-4 mb-4"
                        aria-expanded={open}
                        onClick={() => setOpen(false)}>
                        <MdClose />
                        <span className="sr-only">Close Menu</span>
                    </button>
                    <div className="grid justify-items-end gap-8">
                        {settings.data.navigation.map((item, index) => {
                            if (item.cta_button) {
                                return <>
                                    <BtnLink field={item.link} onClick={() => setOpen(false)}
                                        aria-current={
                                            pathName.includes(asLink(item.link) as string) ? "page" : undefined
                                        }>{item.label}</BtnLink>
                                </>
                            }
                            return (
                                <PrismicNextLink
                                    key={index} field={item.link} className="block px-3 text-3xl first:mt-8"
                                    onClick={() => setOpen(false)}
                                    aria-current={
                                        pathName.includes(asLink(item.link) as string) ? "page" : undefined
                                    }>
                                    {item.label}
                                </PrismicNextLink>
                            )
                        })}
                    </div>

                </div>
                {/* Desktop nav */}
                <ul className="gap-6 hidden md:flex">
                    {settings.data.navigation.map((item, index) => {
                        if (item.cta_button) {
                            return <li key={index}>
                                <BtnLink field={item.link}
                                aria-current={
                                    pathName.includes(asLink(item.link) as string) ? "page" : undefined
                                }>{item.label}</BtnLink>
                            </li>
                        }
                        return (
                            <li key={index}>
                                <PrismicNextLink field={item.link} className="inline-flex min-h-11 items-center"
                                aria-current={
                                    pathName.includes(asLink(item.link) as string) ? "page" : undefined
                                }>
                                    {item.label}
                                </PrismicNextLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}
