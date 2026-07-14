"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { getHomeDetail } from "../lib/home-details";

const HomeDetailContext = createContext(null);

export function HomeDetailProvider({ children }) {
  const [activeId, setActiveId] = useState(null);

  const openDetail = useCallback((id) => {
    if (!getHomeDetail(id)) return;
    setActiveId(id);
  }, []);

  const closeDetail = useCallback(() => {
    setActiveId(null);
  }, []);

  const value = useMemo(
    () => ({ activeId, openDetail, closeDetail }),
    [activeId, openDetail, closeDetail],
  );

  return <HomeDetailContext.Provider value={value}>{children}</HomeDetailContext.Provider>;
}

export function useHomeDetail() {
  const context = useContext(HomeDetailContext);
  if (!context) {
    throw new Error("useHomeDetail must be used within HomeDetailProvider");
  }
  return context;
}

export function ExpandableBlock({ detailId, className = "", children, ...props }) {
  const { openDetail } = useHomeDetail();

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail(detailId);
    }
  }

  return (
    <div
      className={`expandable-block ${className}`.trim()}
      role="button"
      tabIndex={0}
      onClick={() => openDetail(detailId)}
      onKeyDown={handleKeyDown}
      aria-haspopup="dialog"
      {...props}
    >
      {children}
    </div>
  );
}
