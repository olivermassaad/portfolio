"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function gallerySrc(src) {
  return encodeURI(src);
}

export default function DetailGallery({ items = [] }) {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIndex(0);
    setMuted(false);
  }, [items]);

  const current = items.length ? items[index % items.length] : null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || current?.type !== "video") return;

    video.muted = muted;
    const attempt = video.play();
    if (attempt?.catch) {
      attempt.catch(() => {
        // Browser blocked unmuted autoplay: fall back to muted playback.
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
      });
    }
  }, [current, muted]);

  if (!items.length) {
    return (
      <div className="detail-gallery detail-gallery-empty">
        <div className="detail-gallery-stack" aria-hidden="true">
          <span className="detail-gallery-layer layer-3" />
          <span className="detail-gallery-layer layer-2" />
          <span className="detail-gallery-layer layer-1" />
        </div>
        <p className="detail-gallery-empty-text">Gallery</p>
        <span className="detail-gallery-empty-hint">Add photos or videos in the gallery array</span>
      </div>
    );
  }

  function showNext() {
    setIndex((prev) => (prev + 1) % items.length);
  }

  return (
    <button
      type="button"
      className="detail-gallery"
      onClick={showNext}
      aria-label={`Show next media. Currently ${index + 1} of ${items.length}`}
    >
      <div className="detail-gallery-stack" aria-hidden="true">
        <span className="detail-gallery-layer layer-3" />
        <span className="detail-gallery-layer layer-2" />
        <span className="detail-gallery-layer layer-1" />
      </div>

      <div className="detail-gallery-media">
        {current.type === "video" ? (
          <video
            key={current.src}
            ref={videoRef}
            src={current.src}
            poster={current.poster}
            muted={muted}
            playsInline
            autoPlay
            loop
          />
        ) : (
          <Image
            key={current.src}
            src={gallerySrc(current.src)}
            alt={current.alt ?? ""}
            fill
            sizes="(max-width: 768px) 92vw, 720px"
            quality={72}
            className="detail-gallery-image"
            draggable={false}
            priority={index === 0}
          />
        )}
      </div>

      {current.type === "video" ? (
        <span
          role="button"
          tabIndex={0}
          className="detail-gallery-sound"
          aria-label={muted ? "Unmute video" : "Mute video"}
          aria-pressed={!muted}
          onClick={(event) => {
            event.stopPropagation();
            setMuted((prev) => !prev);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              setMuted((prev) => !prev);
            }
          }}
        >
          {muted ? "Muted" : "Sound on"}
        </span>
      ) : null}

      <span className="detail-gallery-counter">
        {index + 1} / {items.length}
      </span>
    </button>
  );
}
