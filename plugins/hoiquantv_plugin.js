var BASE_URL = "https://hoiquantv.site";
var MATCH_URL = "https://hoiquantv.site/truc-tiep/shenzhen-2028-vs-shaanxi-union-luc-1500-ngay-15-05-2026-69759igxrp5fgk2";
var DATA_URL = "https://raw.githubusercontent.com/congvinh2199-lee/monplayer-source/main/plugins.json?ver=200";

function getManifest() {
    return JSON.stringify({
        id: "hoiquantv2",
        name: "HoiquanTV 2",
        version: "2.0.0",
        baseUrl: BASE_URL,
        iconUrl: BASE_URL + "/favicon.ico",
        isEnabled: true,
        isAdult: false,
        type: "MOVIE",
        layoutType: "VERTICAL",
        playerType: "embed"
    });
}

function getHomeSections() {
    return JSON.stringify([
        {
            slug: "live",
            title: "Trực tiếp HoiquanTV",
            type: "Grid",
            path: "live"
        }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        {
            name: "Trực tiếp",
            slug: "live"
        }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: []
    });
}

function getUrlList(slug, filtersJson) {
    return DATA_URL;
}

function getUrlSearch(keyword, filtersJson) {
    return DATA_URL;
}

function getUrlDetail(slug) {
    return MATCH_URL;
}

function getUrlCategories() {
    return DATA_URL;
}

function getUrlCountries() {
    return DATA_URL;
}

function getUrlYears() {
    return DATA_URL;
}

function parseListResponse(responseText) {
    return JSON.stringify({
        items: [
            {
                id: "shenzhen-2028-vs-shaanxi-union",
                title: "Shenzhen 2028 vs ShaanXi Union",
                posterUrl: BASE_URL + "/favicon.ico",
                backdropUrl: BASE_URL + "/favicon.ico",
                description: "Trực tiếp Shenzhen 2028 vs ShaanXi Union lúc 15:00 ngày 15-05-2026 trên HoiquanTV.",
                year: 2026,
                quality: "HD",
                episode_current: "LIVE",
                lang: "BLV"
            }
        ],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 1,
            itemsPerPage: 20
        }
    });
}

function parseSearchResponse(responseText) {
    return parseListResponse(responseText);
}

function parseMovieDetail(html) {
    return JSON.stringify({
        id: "shenzhen-2028-vs-shaanxi-union",
        title: "Shenzhen 2028 vs ShaanXi Union",
        posterUrl: BASE_URL + "/favicon.ico",
        backdropUrl: BASE_URL + "/favicon.ico",
        description: "Bấm tập bên dưới để mở trang xem trực tiếp bằng WebView.",
        year: 2026,
        rating: 0,
        quality: "HD",
        episode_current: "LIVE",
        lang: "BLV",
        category: "Bóng đá",
        country: "Trung Quốc",
        director: "",
        casts: "Shenzhen 2028, ShaanXi Union",
        status: "LIVE",
        duration: "Trực tiếp",
        servers: [
            {
                name: "HoiquanTV",
                episodes: [
                    {
                        id: MATCH_URL,
                        name: "Xem trực tiếp",
                        slug: MATCH_URL
                    }
                ]
            }
        ]
    });
}

function parseDetailResponse(html) {
    return JSON.stringify({
        url: MATCH_URL,
        isEmbed: true,
        mimeType: "",
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Referer": BASE_URL + "/"
        },
        subtitles: []
    });
}

function parseEmbedResponse(html, sourceUrl) {
    return JSON.stringify({
        url: sourceUrl || MATCH_URL,
        isEmbed: false,
        mimeType: "",
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Referer": BASE_URL + "/"
        },
        subtitles: []
    });
}
