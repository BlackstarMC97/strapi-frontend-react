import { createClient } from 'contentful';

const useContentful = () => {
    const client:any = createClient({
        space: "tz86kzed1b8h",
        accessToken: "SsNXTpw1YGSqemOaslldUVpGOtC8NJYqyHB3U_GWgB4",
        host: "preview.contentful.com"
    });
    
    const getTestimons = async () => {
        try {
            const testimonials:any = await client.getEntries({
                content_type: "testimonials",
                select: "fields"
            });

            return testimonials;
        }
        catch(error) {
            console.log(`Error fetching testimonials : ${error}`);
        }
    }

    return { getTestimons };
}

export default useContentful;