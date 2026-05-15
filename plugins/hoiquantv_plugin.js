// hoiquantv_plugin.js
// Nguồn Monplayer/VAAPP dạng plugin.
// Lưu ý: plugin này KHÔNG tách/bypass link stream ẩn. Nó tạo 1 mục xem dạng WebView/embed trỏ tới trang chính thức.
// Nếu Hoiquantv có API HTTP công khai cho lịch/trận/link phát, có thể bổ sung parseListResponse để lấy dữ liệu động.

var BASE_URL = "https://hoiquantv.site";
var UA = "Mozilla/5.0 (Linux; Android 10; Monplayer) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36";

function toJson(obj) {
    return JSON.stringify(obj);
}

function safeParseFilters(filtersJson) {
    try {
        return filtersJson ? JSON.parse(filtersJson) : {};
    } catch (e) {
        return {};
    }
}

function getManifest() {
    return toJson({
        id: "hoiquantv",
        name: "HoiquanTV",
        version: "1.0.0",
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
    return toJson([
        { slug: "home", title: "HoiquanTV", type: "Horizontal", path: "" },
        { slug: "live", title: "Trực tiếp bóng đá", type: "Horizontal", path: "" },
        { slug: "schedule", title: "Lịch thi đấu", type: "Horizontal", path: "" },
        { slug: "result", title: "Kết quả bóng đá", type: "Horizontal", path: "" }
    ]);
}

function getPrimaryCategories() {
    return toJson([
        { name: "Trang chủ", slug: "home" },
        { name: "Đang live / Hôm nay", slug: "live" },
        { name: "Lịch thi đấu", slug: "schedule" },
        { name: "Bảng xếp hạng", slug: "ranking" },
        { name: "Kết quả bóng đá", slug: "result" }
    ]);
}

function getFilterConfig() {
    return toJson({
        sorts: [],
        years: [],
        countries: [],
        categories: []
    });
}

function getUrlList(slug, filtersJson) {
    // Hoiquantv render danh sách trận bằng WebSocket trên trình duyệt.
    // Plugin sandbox không tự mở WebSocket, nên danh sách trong app dùng mục tĩnh để mở trang bằng WebView.
    if (slug === "schedule") return BASE_URL + "/lich-thi-dau/";
    if (slug === "ranking") return BASE_URL + "/bang-xep-hang/";
    if (slug === "result") return BASE_URL + "/ket-qua-bong-da/";
    return BASE_URL + "/";
}

function getUrlSearch(keyword, filtersJson) {
    // Website không có endpoint search HTML rõ ràng trong tài liệu, trả về trang chủ.
    return BASE_URL + "/";
}

function getUrlDetail(slug) {
    // Nếu id là URL đầy đủ thì dùng luôn, nếu không thì về trang chủ.
    if (slug && slug.indexOf("http") === 0) return slug;
    if (slug === "schedule") return BASE_URL + "/lich-thi-dau/";
    if (slug === "ranking") return BASE_URL + "/bang-xep-hang/";
    if (slug === "result") return BASE_URL + "/ket-qua-bong-da/";
    return BASE_URL + "/";
}

function getUrlCategories() {
    return BASE_URL + "/";
}

function getUrlCountries() {
    return BASE_URL + "/";
}

function getUrlYears() {
    return BASE_URL + "/";
}

function makeItem(id, title, description, url) {
    return {
        id: url || BASE_URL + "/",
        title: title,
        posterUrl: BASE_URL + "/favicon.ico",
        backdropUrl: "",
        description: description,
        year: 2026,
        quality: "HD",
        episode_current: "Mở bằng WebView",
        lang: "Live"
    };
}

function parseListResponse(html) {
    try {
        return toJson({
            items: [
                makeItem(
                    "hoiquantv-live",
                    "HoiquanTV - Trực tiếp bóng đá",
                    "Mở trang HoiquanTV để xem danh sách trận đang live, hot, hôm nay và ngày mai.",
                    BASE_URL + "/"
                ),
                makeItem(
                    "hoiquantv-schedule",
                    "Lịch thi đấu",
                    "Xem lịch thi đấu bóng đá trên HoiquanTV.",
                    BASE_URL + "/lich-thi-dau/"
                ),
                makeItem(
                    "hoiquantv-result",
                    "Kết quả bóng đá",
                    "Xem kết quả bóng đá trên HoiquanTV.",
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
    } catch (e) {
        return toJson({
            items: [],
            pagination: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 20 }
        });
    }
}

function parseSearchResponse(html) {
    return parseListResponse(html);
}

function parseMovieDetail(html) {
    return toJson({
        id: "hoiquantv-live",
        title: "HoiquanTV - Trực tiếp bóng đá",
        posterUrl: BASE_URL + "/favicon.ico",
        backdropUrl: "",
        description: "Bấm tập bên dưới để mở HoiquanTV bằng WebView. Danh sách trận của website được tải động trên trình duyệt.",
        servers: [
            {
                name: "WebView",
                episodes: [
                    { id: BASE_URL + "/", name: "Mở trang chủ", slug: BASE_URL + "/" },
                    { id: BASE_URL + "/lich-thi-dau/", name: "Lịch thi đấu", slug: BASE_URL + "/lich-thi-dau/" },
                    { id: BASE_URL + "/ket-qua-bong-da/", name: "Kết quả", slug: BASE_URL + "/ket-qua-bong-da/" }
                ]
            }
        ],
        quality: "HD",
        year: 2026,
        rating: 0,
        casts: "",
        director: "",
        category: "Thể thao, Bóng đá",
        status: "Live",
        duration: "Trực tiếp"
    });
}

function parseDetailResponse(html) {
    // Trả URL dạng embed/WebView, không resolve link .m3u8/.mp4 ẩn.
    return toJson({
        url: BASE_URL + "/",
        isEmbed: true,
        mimeType: "",
        headers: {
            Referer: BASE_URL + "/",
            "User-Agent": UA
        },
        subtitles: []
    });
}

function parseEmbedResponse(html, sourceUrl) {
    return toJson({
        url: sourceUrl || BASE_URL + "/",
        isEmbed: false,
        mimeType: "",
        headers: {
            Referer: BASE_URL + "/",
            "User-Agent": UA
        },
        subtitles: []
    });
}
