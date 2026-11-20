"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { localizePath } from "@/lib/i18n";

/**
 * Drop-in replacement for next/link that keeps visitors in their language:
 * on Hindi pages "/places/x" becomes "/hi/places/x" (when a Hindi version exists).
 */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
    const { language } = useLanguage();
    const localized = typeof href === "string" ? localizePath(href, language) : href;
    return <NextLink href={localized} {...rest} />;
}
