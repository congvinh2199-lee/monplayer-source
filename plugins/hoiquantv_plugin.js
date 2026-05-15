var BASE_URL = "https://hoiquantv.site";
var DATA_URL = "https://raw.githubusercontent.com/congvinh2199-lee/monplayer-source/refs/heads/main/plugins.json";

function getManifest() {
    return JSON.stringify({
        id: "hoiquantv",
        name: "HoiquanTV",
        version: "1.0.2",
        baseUrl: BASE_URL,
        iconUrl: BASE_URL + "/favicon.ico",
        isEnabled: true,
        type: "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: "home", title: "HoiquanTV", type: "Horizontal", path: "list" },
        { slug: "live", title: "Trực tiếp bóng đá", type: "Horizontal", path: "list" },
        { slug: "schedule", title: "Lịch thi đấu", type: "Horizontal", path: "list" }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: "Trang chủ", slug: "home" },
        { name: "Đang live / Hôm nay", slug: "live" },
        { name: "Lịch thi đấu", slug: "schedule" },
        { name: "Kết quả bóng đá", slug: "result" }
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

function makeMovie(id, title, description, url) {
    return {
        id: id,
        title: title,
        posterUrl: BASE_URL + "/favicon.ico",
        backdropUrl: "",
        year: 2026,
        quality: "HD",
        episode_current: "Bấm để mở",
        lang: "Live",
        description: description,
        url: url
    };
}

function parseListResponse(responseText) {
    return JSON.stringify({
        items: [
            makeMovie(
                "hoiquantv-home",
                "HoiquanTV - Trực tiếp bóng đá",
                "Mở trang chủ HoiquanTV để xem các trận đang phát.",
                BASE_URL + "/"
            ),
            makeMovie(
                "hoiquantv-schedule",
                "Lịch thi đấu bóng đá",
                "Mở lịch thi đấu trên HoiquanTV.",
                BASE_URL + "/lich-thi-dau/"
            ),
            makeMovie(
                "hoiquantv-result",
                "Kết quả bóng đá",
                "Mở kết quả bóng đá trên HoiquanTV.",
                BASE_URL + "/ket-qua-bong-da/"
            )
        ],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 3,
            itemsPerPage: 20
        }
    });
}

function parseSearchResponse(responseText) {
    return parseListResponse(responseText);
}

function parseMovieDetail(responseText) {
    return JSON.stringify({
        id: "hoiquantv-home",
        title: "HoiquanTV - Trực tiếp bóng đá",
        posterUrl: BASE_URL + "/favicon.ico",
        backdropUrl: "",
        description: "Bấm tập bên dưới để mở HoiquanTV.",
        year: 2026,
        quality: "HD",
        episode_current: "WebView",
        lang: "Live",
        category: "Bóng đá",
        country: "Việt Nam",
        director: "",
        casts: "",
        servers: [
            {
                name: "HoiquanTV",
                episodes: [
                    { id: BASE_URL + "/", name: "Mở trang chủ", slug: BASE_URL + "/" },
                    { id: BASE_URL + "/lich-thi-dau/", name: "Lịch thi đấu", slug: BASE_URL + "/lich-thi-dau/" },
                    { id: BASE_URL + "/ket-qua-bong-da/", name: "Kết quả bóng đá", slug: BASE_URL + "/ket-qua-bong-da/" }
                ]
            }
        ]
    });
}

function parseDetailResponse(responseText) {
    return JSON.stringify({
        url: BASE_URL + "/",
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Referer": BASE_URL + "/"
        },
        subtitles: []
    });
}
