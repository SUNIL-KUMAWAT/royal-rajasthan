// components/SEOHead.tsx
interface SEOHeadProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: "website" | "article";
    keywords?: string[];
    schema?: object;
}

export function SEOHead({
    title,
    description,
    image = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200",
    url = "https://royalrajasthan.com",
    type = "website",
    keywords = [],
    schema,
}: SEOHeadProps) {
    const fullTitle = `${title} | Royal Rajasthan Tourism`;

    return (
        <>
            {/* Basic */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(", ")} />
            )}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="Royal Rajasthan Tourism" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={url} />

            {/* Schema */}
            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            )}
        </>
    );
}