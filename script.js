const { useState, useEffect, useCallback, useRef } = React;

// --- JSON CONFIG: EDIT THIS TO CHANGE ALBUMS/PHOTOS ---
// Optional per album: description: "short line"
// Optional per photo: desc: "caption"
const GALLERY_CONFIG = {
    albums: [
        {
            id: 1,
            title: "Happy Birthday ❤️ ENIOLA ❤️",
            cover: "./Assets1/1/IMG-20260221-WA0116~2.jpg",
            photos: [
                { type: "image", url: "./Assets1/1/1.jpg" },
                { type: "image", url: "./Assets1/1/3.jpg" },
                { type: "image", url: "./Assets1/1/4.jpg" },
                { type: "image", url: "./Assets1/1/17.jpg" },
                { type: "image", url: "./Assets1/1/16.jpg" },
                { type: "video", url: "./Assets1/1/VID-20260222-WA0030.mp4" }
            ]
        },
        {
            id: 2,
            title: "Happy Birthday ❤️ ALIMAT ❤️",
            cover: "./Assets1/2/Snapchat-662685168.jpg",
            photos: [
                { type: "image", url: "./Assets1/2/IMG-20240724-WA0037.jpg" },
                { type: "image", url: "./Assets1/2/IMG-20240724-WA0038.jpg" },
                { type: "image", url: "./Assets1/2/IMG-20240724-WA0039.jpg" },
                { type: "image", url: "./Assets1/2/IMG-20240724-WA0040.jpg" },
                { type: "image", url: "./Assets1/2/Snapchat-662685168.jpg" }
            ]
        },
        {
            id: 3,
            title: "Happy Birthday ❤️ ADEOLA ❤️",
            cover: "./Assets1/3/Snapchat-1908775105.jpg",
            photos: [
                { type: "image", url: "./Assets1/3/Snapchat-11190297.jpg" },
                { type: "image", url: "./Assets1/3/Snapchat-72492610.jpg" },
                { type: "image", url: "./Assets1/3/Snapchat-84391015.jpg" },
                { type: "image", url: "./Assets1/3/Snapchat-170784202.jpg" },
                { type: "image", url: "./Assets1/3/Snapchat-1022162278.jpg" },
                { type: "image", url: "./Assets1/3/Snapchat-1231056604.jpg" },
                { type: "image", url: "./Assets1/3/Snapchat-1678029599.jpg" },
                { type: "image", url: "./Assets1/3/Snapchat-1814643712.jpg" },
                { type: "image", url: "./Assets1/3/Snapchat-1815568011.jpg" }
            ]
        },
        {
            id: 4,
            title: "Happy Birthday ❤️ MY PANDA ❤️",
            cover: "./Assets1/4/Snapchat-1565457805.jpg",
            photos: [
                { type: "image", url: "./Assets1/4/Snapchat-217025047.jpg" },
                { type: "image", url: "./Assets1/4/Snapchat-383472431.jpg" },
                { type: "image", url: "./Assets1/4/Snapchat-991178838.jpg" },
                { type: "image", url: "./Assets1/4/Snapchat-1126392652.jpg" },
                { type: "image", url: "./Assets1/4/Snapchat-1332616924.jpg" },
                { type: "image", url: "./Assets1/4/Snapchat-1347144789.jpg" },
                { type: "video", url: "./Assets1/4/Snapchat-1926641119.mp4" }
            ]
        },
        {
            id: 5,
            title: "Happy Birthday ❤️ IYAWO MI ❤️",
            cover: "./Assets1/5/Snapchat-2074175960.jpg",
            photos: [
                { type: "image", url: "./Assets1/5/Snapchat-569095708.jpg" },
                { type: "image", url: "./Assets1/5/Snapchat-1002406756.jpg" },
                { type: "image", url: "./Assets1/5/Snapchat-2074175960.jpg" },
                { type: "image", url: "./Assets1/5/Snapchat-2095059851.jpg" },
                { type: "image", url: "./Assets1/5/Snapchat-2118541484.jpg" },
                { type: "video", url: "./Assets1/5/Snapchat-127262652.mp4" },
                { type: "video", url: "./Assets1/5/Snapchat-546959026.mp4" },
                { type: "video", url: "./Assets1/5/Snapchat-1146969437.mp4" },
                { type: "video", url: "./Assets1/5/Snapchat-1404380966.mp4" },
                { type: "video", url: "./Assets1/5/Snapchat-1831755927.mp4" }
            ]
        },
        {
            id: 6,
            row: "bottom",
            title: "  ❤️ RN/RM ❤️",
            cover: "./Assets1/6/IMG-20261124-WA0013.jpg",
            photos: [
               { type: "image", url: "./Assets1/6/IMG-20261124-WA0009.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261124-WA0011.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261124-WA0013.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261124-WA0014.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261124-WA0015.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261125-WA0015.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261125-WA0018.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261125-WA0019.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261125-WA0023.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261125-WA0024.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261125-WA0025.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261125-WA0026.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261125-WA0027.jpg" },
               { type: "image", url: "./Assets1/6/IMG-20261125-WA0028.jpg" }
            ]
        }
    ]
};

// Keeps track of the window size so the circle re-fits on rotate/resize
const useViewport = () => {
    const get = () => ({ w: window.innerWidth, h: window.innerHeight });
    const [size, setSize] = useState(get);
    useEffect(() => {
        const onResize = () => setSize(get());
        window.addEventListener('resize', onResize);
        window.addEventListener('orientationchange', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('orientationchange', onResize);
        };
    }, []);
    return size;
};

// Works out card size and circle radius so the circle AND the bottom row
// both fit on one screen (no scrolling). Cards shrink a little on short screens.
const computeLayout = (w, h, ringCount, bottomCount) => {
    const baseW = w < 768 ? 100 : 160;
    const baseH = w < 768 ? 140 : 220;
    const pad = 40;   // total top + bottom breathing room
    const gap = 14;   // space between circle and bottom row
    const sinN = Math.sin(Math.PI / Math.max(ringCount, 3));
    let out = null;
    for (let s = 1; s >= 0.5; s -= 0.05) {
        const cw = Math.round(baseW * s);
        const ch = Math.round(baseH * s);
        const rMin = (cw + 8) / (2 * sinN);                  // cards must not overlap
        const rW = (w - 16 - cw) / 2;                        // must fit the width
        const rH = bottomCount ? (h - pad - gap - 2 * ch) / 2 // must fit the height
                               : (h - pad - ch) / 2;
        const r = Math.min(240, rW, rH);
        const rowW = bottomCount * cw + Math.max(bottomCount - 1, 0) * 12;
        out = { cw, ch, gap, r: Math.max(r, rMin) };
        if (r >= rMin && rowW <= w - 16) return out;
    }
    return out;
};

// Album <-> URL hash, so the phone's back button returns to the circle
const albumFromHash = () => {
    const id = Number(window.location.hash.replace('#album-', ''));
    return GALLERY_CONFIG.albums.find(a => a.id === id) || null;
};

const App = () => {
    const [activeAlbum, setActiveAlbum] = useState(albumFromHash);
    const [mediaIndex, setMediaIndex] = useState(null); // index inside activeAlbum.photos
    const { w, h } = useViewport();
    const touchStartX = useRef(null);

    // Sync state with browser back/forward
    useEffect(() => {
        const onHash = () => {
            setActiveAlbum(albumFromHash());
            setMediaIndex(null);
        };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    const openAlbum = (album) => { window.location.hash = `album-${album.id}`; };
    const closeAlbum = () => { history.length > 1 && window.location.hash ? history.back() : (window.location.hash = ''); };

    // Scroll to top when switching views
    useEffect(() => { window.scrollTo(0, 0); }, [activeAlbum]);

    const photos = activeAlbum ? activeAlbum.photos : [];
    const selected = mediaIndex !== null ? photos[mediaIndex] : null;

    const showNext = useCallback(() => {
        setMediaIndex(i => (i === null ? i : (i + 1) % photos.length));
    }, [photos.length]);
    const showPrev = useCallback(() => {
        setMediaIndex(i => (i === null ? i : (i - 1 + photos.length) % photos.length));
    }, [photos.length]);

    // Keyboard controls + lock page scroll while modal is open
    useEffect(() => {
        if (mediaIndex === null) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setMediaIndex(null);
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [mediaIndex, showNext, showPrev]);

    // Split albums: ring (circle) vs bottom row, then size everything to fit the screen
    const ringAlbums = GALLERY_CONFIG.albums.filter(a => a.row !== 'bottom');
    const bottomAlbums = GALLERY_CONFIG.albums.filter(a => a.row === 'bottom');
    const { cw, ch, gap, r: radius } = computeLayout(w, h, ringAlbums.length, bottomAlbums.length);

    const getCircleStyles = (index, total) => {
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // start at 12 o'clock
        const x = Math.round(Math.cos(angle) * radius);
        const y = Math.round(Math.sin(angle) * radius);
        return { '--x': `${x}px`, '--y': `${y}px` };
    };

    const renderCard = (album, style) => (
        <button
            type="button"
            key={album.id}
            className="album-card"
            style={style}
            onClick={() => openAlbum(album)}
        >
            <img src={album.cover} className="album-cover" alt="" loading="lazy" />
            <div className="album-info">
                <h3>{album.title}</h3>
                {album.description && <p>{album.description}</p>}
            </div>
        </button>
    );

    const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) (dx < 0 ? showNext : showPrev)();
    };

    return (
        <div className="app-wrapper">
            {!activeAlbum ? (
                /* HOMEPAGE: THE CIRCLE + BOTTOM ROW */
                <div
                    className="home-container"
                    style={{ '--cw': `${cw}px`, '--ch': `${ch}px`, '--gap': `${gap}px` }}
                >
                    <div className="ring-area" style={{ height: 2 * radius + ch }}>
                        <div className="circle-wrapper" style={{ '--r': `${radius}px` }}>
                            {ringAlbums.map((album, i) =>
                                renderCard(album, getCircleStyles(i, ringAlbums.length))
                            )}
                        </div>
                    </div>
                    {bottomAlbums.length > 0 && (
                        <div className="bottom-row">
                            {bottomAlbums.map(album => renderCard(album))}
                        </div>
                    )}
                </div>
            ) : (
                /* DETAIL VIEW: THE GRID */
                <div className="view-container">
                    <button type="button" className="back-btn" onClick={closeAlbum}>
                        <i className="fa-solid fa-arrow-left"></i> BACK
                    </button>
                    <h1 className="album-title">{activeAlbum.title}</h1>
                    <div className="photo-grid">
                        {activeAlbum.photos.map((item, i) => (
                            <button
                                type="button"
                                key={item.url}
                                className="photo-item"
                                onClick={() => setMediaIndex(i)}
                            >
                                {item.type === 'video' ? (
                                    <>
                                        {/* #t=0.1 makes iOS show the first frame as a preview */}
                                        <video src={`${item.url}#t=0.1`} muted playsInline preload="metadata" />
                                        <span className="play-badge" aria-hidden="true">▶</span>
                                    </>
                                ) : (
                                    <img src={item.url} alt={item.desc || `Memory ${i + 1}`} loading="lazy" decoding="async" />
                                )}
                                {item.desc && <div className="photo-desc">{item.desc}</div>}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* FULLSCREEN MODAL */}
            {selected && (
                <div
                    className="modal"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setMediaIndex(null)}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <button type="button" className="modal-close" aria-label="Close" onClick={() => setMediaIndex(null)}>&times;</button>
                    {photos.length > 1 && (
                        <>
                            <button type="button" className="modal-nav prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); showPrev(); }}>&#10094;</button>
                            <button type="button" className="modal-nav next" aria-label="Next" onClick={(e) => { e.stopPropagation(); showNext(); }}>&#10095;</button>
                        </>
                    )}
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {selected.type === 'video' ? (
                            <video key={selected.url} src={selected.url} controls autoPlay loop playsInline />
                        ) : (
                            <img key={selected.url} src={selected.url} alt={selected.desc || 'Fullscreen memory'} />
                        )}
                        {selected.desc && <p className="modal-caption">{selected.desc}</p>}
                        <p className="modal-count">{mediaIndex + 1} / {photos.length}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
