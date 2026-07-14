"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function gallerySrc(src) {
  return encodeURI(src);
}

export default function DetailGallery({ items = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [items]);

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

  const current = items[index % items.length];

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
            src={current.src}
            poster={current.poster}
            muted
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
            unoptimized
            sizes="(max-width: 768px) 92vw, 720px"
            className="detail-gallery-image"
            draggable={false}
            priority={index === 0}
          />
        )}
      </div>

      <span className="detail-gallery-counter">
        {index + 1} / {items.length}
      </span>
    </button>
  );
}
