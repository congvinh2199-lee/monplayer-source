var BASE_URL = "https://hoiquantv.site";
var MATCH_URL = "https://hoiquantv.site/truc-tiep/shenzhen-2028-vs-shaanxi-union-luc-1500-ngay-15-05-2026-69759igxrp5fgk2";
var DATA_URL = "https://raw.githubusercontent.com/congvinh2199-lee/monplayer-source/main/plugins.json?ver=1000";
var ICON_URL = "https://raw.githubusercontent.com/youngbi/repo/main/plugins/ophim.ico";

function getManifest() {
    return JSON.stringify({
        id: "hoiquantv_match",
        name: "HoiquanTV - Shenzhen vs ShaanXi",
        version: "10.0.0",
        baseUrl: BASE_URL,
        iconUrl: ICON_URL,
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
            slug: "phim-moi",
            title: "Trận đang xem",
            type: "Grid",
            path: "danh-sach"
        }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        {
            name: "Trận đang xem",
            slug: "phim-moi"
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
    return DATA_URL;
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
                id: "match_shenzhen_shaanxi",
                title: "Shenzhen 2028 vs ShaanXi Union",
                posterUrl: ICON_URL,
                backdropUrl: ICON_URL,
                description: "Bấm vào để mở trận Shenzhen 2028 vs ShaanXi Union trên HoiquanTV.",
                year: 2026,
                quality: "HD",
                episode_current: "LIVE",
                lang: "WebView"
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

function parseMovieDetail(responseText) {
    return JSON.stringify({
        id: "match_shenzhen_shaanxi",
        title: "Shenzhen 2028 vs ShaanXi Union",
        posterUrl: ICON_URL,
        backdropUrl: ICON_URL,
        description: "Bấm nút xem bên dưới để mở link trận đấu bằng WebView.",
        year: 2026,
        rating: 0,
        quality: "HD",
        episode_current: "LIVE",
        lang: "WebView",
        category: "Bóng đá",
        country: "",
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

function parseDetailResponse(responseText) {
    return JSON.stringify({
        url: MATCH_URL,
        isEmbed: false,
        mimeType: "",
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Referer": BASE_URL + "/"
        },
        subtitles: []
    });
}

function parseEmbedResponse(responseText, sourceUrl) {
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

function parseCategoriesResponse(responseText) {
    return JSON.stringify([
        {
            name: "Trận đang xem",
            slug: "phim-moi"
        }
    ]);
}

function parseCountriesResponse(responseText) {
    return JSON.stringify([]);
}

function parseYearsResponse(responseText) {
    return JSON.stringify([]);
}
