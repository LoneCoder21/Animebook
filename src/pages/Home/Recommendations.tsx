import "assets/pages/Home/recommendation.scss";

export function Recommendation({ url, title }: { url: string; title: string }) {
    return (
        <div className="recommendation">
            <img src={url} alt={title}></img>
            <button>
                <b>{title}</b>
            </button>
        </div>
    );
}

export default function Recommendations() {
    const data = [
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" },
        { url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" }
    ];

    return (
        <div className="recommendation_container">
            <h2 className="recommendation_title">Recommendations</h2>
            <div className="recommendations">
                {data.map((item) => {
                    return <Recommendation key={item.title} {...item} />;
                })}
            </div>
        </div>
    );
}
