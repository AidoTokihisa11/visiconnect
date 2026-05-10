import React, { useState, useRef, useEffect, useId } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

/**
 * Inline contextual help (à la impots.gouv.fr).
 *
 * Renders a discreet "ⓘ More info" trigger that opens a small popover
 * **without** navigating away from the page (cf. analyse UX 2.6).
 *
 * Also exports a low-level <Tooltip> wrapper for icon buttons (cf. US-UX-01)
 * since both share the same overlay primitive.
 *
 * Usage:
 *   <HelpPopover label="Pourquoi cette information ?">
 *     Votre adresse permet d'émettre des factures conformes…
 *   </HelpPopover>
 *
 *   <Tooltip label="Activer le micro">
 *     <button><Mic /></button>
 *   </Tooltip>
 */

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  background: transparent;
  border: none;
  color: #2563eb;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.15s;

  &:hover, &:focus-visible {
    background: rgba(37, 99, 235, 0.08);
    outline: none;
  }
`;

const PopoverPanel = styled(motion.div)`
  position: absolute;
  z-index: 50;
  top: calc(100% + 8px);
  left: 0;
  width: min(320px, calc(100vw - 32px));
  background: white;
  color: #0f172a;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
  padding: 14px 16px 14px 14px;
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: left;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 14px;
    width: 12px;
    height: 12px;
    background: white;
    border-left: 1px solid #e2e8f0;
    border-top: 1px solid #e2e8f0;
    transform: rotate(45deg);
  }
`;

const PopoverHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;

  strong {
    font-size: 0.85rem;
    color: #0f172a;
    font-weight: 700;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;

  &:hover { color: #0f172a; }
`;

const Wrapper = styled.span`
  position: relative;
  display: inline-block;
`;

export const HelpPopover = ({
  label = 'En savoir plus',
  title,
  children,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const triggerId = useId();
  const panelId = `${triggerId}-panel`;

  // Click-outside + escape to close.
  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <Wrapper ref={wrapperRef} className={className}>
      <Trigger
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <Info size={14} aria-hidden="true" />
        {label}
      </Trigger>
      <AnimatePresence>
        {open && (
          <PopoverPanel
            id={panelId}
            role="dialog"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <PopoverHeader>
              {title && <strong>{title}</strong>}
              <CloseButton type="button" onClick={() => setOpen(false)} aria-label="Fermer l'aide">
                <X size={14} />
              </CloseButton>
            </PopoverHeader>
            <div>{children}</div>
          </PopoverPanel>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

/* -------------------------------------------------------------------------- */
/*  <Tooltip>                                                                  */
/*  Pure-CSS hover/focus tooltip for icon buttons (whiteboard, room controls). */
/* -------------------------------------------------------------------------- */

const TooltipWrapper = styled.span`
  position: relative;
  display: inline-flex;

  > .vc-tooltip-bubble {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.95);
    color: white;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 6px;
    white-space: nowrap;
    transition: opacity 0.12s ease, visibility 0.12s ease;
    z-index: 60;
  }

  &:hover > .vc-tooltip-bubble,
  &:focus-within > .vc-tooltip-bubble {
    visibility: visible;
    opacity: 1;
  }
`;

export const Tooltip = ({ label, children, side = 'top', disabled = false }) => {
  if (disabled || !label) return children;
  return (
    <TooltipWrapper data-side={side}>
      {children}
      <span className="vc-tooltip-bubble" role="tooltip">{label}</span>
    </TooltipWrapper>
  );
};

export default HelpPopover;
