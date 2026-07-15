"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getHomeDetail } from "../lib/home-details";
import DetailGallery from "./detail-gallery";
import { useHomeDetail } from "./home-detail-context";

export default function DetailModal() {
  const { activeId, closeDetail } = useHomeDetail();
  const detail = activeId ? getHomeDetail(activeId) : null;
  const panelRef = useRef(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!detail) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("detail-modal-open");

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeDetail();
    };

    window.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("detail-modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [detail, closeDetail]);

  if (!detail || !mounted) return null;

  return createPortal(
    <div className="detail-modal-backdrop" onClick={closeDetail} role="presentation">
      <div
        ref={panelRef}
        className={`detail-modal${
          activeId?.startsWith("award-") ||
          activeId?.startsWith("volunteer-") ||
          activeId === "profile-founder"
            ? " detail-modal--fit-gallery"
            : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="detail-modal-close" onClick={closeDetail} aria-label="Close">
          ×
        </button>

        <div className="detail-modal-body">
          <header className="detail-modal-header">
            {detail.badge ? (
              <div className="detail-modal-top">
                <span
                  className={`badge${
                    detail.badge === "Winner"
                      ? " badge-winner"
                      : detail.badge === "Certificate"
                        ? " badge-cert"
                        : ""
                  }`}
                >
                  {detail.badge}
                </span>
              </div>
            ) : null}

            <h2 id={titleId} className="detail-modal-title">
              {detail.title}
            </h2>

            {detail.meta ? <p className="detail-modal-meta">{detail.meta}</p> : null}
            {detail.summary ? <p className="detail-modal-summary">{detail.summary}</p> : null}
          </header>

          <div className="detail-modal-columns">
            <section className="detail-modal-details" aria-label="Details">
              <h3 className="detail-modal-section-title">Details</h3>

              {detail.items?.length ? (
                <ul className="detail-modal-items">
                  {detail.items.map((item) => (
                    <li key={`${item.label}-${item.href ?? ""}`} className="detail-modal-item">
                      <span className="detail-modal-item-label">{item.label}</span>
                      {item.href ? (
                        <a
                          className="btn btn-secondary btn-pill detail-modal-item-link"
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {item.linkLabel ?? "Link"}
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="detail-modal-empty">No detail items yet.</p>
              )}
            </section>

            <section className="detail-modal-gallery-wrap" aria-label="Gallery">
              <DetailGallery key={activeId} items={detail.gallery} />
            </section>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
